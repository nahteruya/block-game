"use client"
import { useState, useEffect } from "react";
import PieceLine from "@/components/Piece/PieceLine";
import PieceSquare from "@/components/Piece/PieceSquare";
import { PIECE_DEFINITIONS } from "@/pieces/definitions";
import { getPieceIndices, isOutOfBounds, checkAndRemoveCompletedLines } from "@/pieces/utils";
import type{ PieceName } from "@/pieces/types";
import PieceRightHook from "@/components/Piece/PieceRightHook";
import PieceLeftHook from "@/components/Piece/PieceLeftHook";
import PieceTee from "@/components/Piece/PieceTee";
import PieceRightCurve from "@/components/Piece/PieceRightCurve";
import PieceLeftCurve from "@/components/Piece/PieceLeftCurve";

// Array com todos os tipos de peças disponíveis (incluindo todas as variações de rotação)
const ALL_PIECE_TYPES: PieceName[] = [
  // Line variations (only unique ones: 0° and 90°)
  'line-0', 'line-90',
  // Square variations (only one needed since all rotations are the same)
  'square-0',
  // Right-hook variations
  'right-hook-0', 'right-hook-90', 'right-hook-180', 'right-hook-270',
  // Left-hook variations
  'left-hook-0', 'left-hook-90', 'left-hook-180', 'left-hook-270',
  // Tee variations
  'tee-0', 'tee-90', 'tee-180', 'tee-270',
  // Right-curve variations
  'right-curve-0', 'right-curve-90', 'right-curve-180', 'right-curve-270',
  // Left-curve variations
  'left-curve-0', 'left-curve-90', 'left-curve-180', 'left-curve-270'
];

// Função para gerar 3 peças aleatórias
const generateRandomPieces = (): PieceName[] => {
  const shuffled = [...ALL_PIECE_TYPES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

// Função para verificar se uma peça pode ser colocada em algum lugar do tabuleiro
const canPlacePiece = (pieceType: PieceName, board: (string | null)[], boardWidth: number, boardHeight: number): boolean => {
  const piece = PIECE_DEFINITIONS[pieceType];
  if (!piece) return false;

  // Verifica todas as posições possíveis no tabuleiro
  for (let row = 0; row < boardHeight; row++) {
    for (let col = 0; col < boardWidth; col++) {
      const baseIndex = row * boardWidth + col;
      
      // Verifica se a peça cabe nesta posição
      if (!isOutOfBounds(baseIndex, piece, boardWidth, boardHeight)) {
        const pieceIndices = getPieceIndices(baseIndex, piece, boardWidth);
        const hasCollision = pieceIndices.some(i => board[i] !== null);
        
        // Se não há colisão, a peça pode ser colocada
        if (!hasCollision) {
          return true;
        }
      }
    }
  }
  
  return false;
};

export default function Home() {
  const [board, setBoard] = useState(Array(100).fill(null));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hoverPieceType, setHoverPieceType] = useState<PieceName | null>(null);
  const [currentDragType, setCurrentDragType] = useState<PieceName | null>(null);
  const [availablePieces, setAvailablePieces] = useState<PieceName[]>([]);
  const [score, setScore] = useState<number>(0);
  const [disabledPieces, setDisabledPieces] = useState<Set<PieceName>>(new Set());

  // Função para verificar e atualizar o estado das peças desativadas
  const updateDisabledPieces = (currentBoard: (string | null)[], currentPieces: PieceName[]) => {
    const newDisabledPieces = new Set<PieceName>();
    
    currentPieces.forEach(pieceType => {
      if (!canPlacePiece(pieceType, currentBoard, 10, 10)) {
        newDisabledPieces.add(pieceType);
      }
    });
    
    setDisabledPieces(newDisabledPieces);
  };

  useEffect(() => {
    const initialPieces = generateRandomPieces();
    
    if (initialPieces.length === 3) {
      setAvailablePieces(initialPieces);
    } else {
      // Fallback: garante que sempre tenhamos 3 peças
      const fallbackPieces = ALL_PIECE_TYPES.slice(0, 3);
      setAvailablePieces(fallbackPieces);
    }
  }, []);

  // Verifica a disponibilidade das peças sempre que o tabuleiro ou as peças mudam
  useEffect(() => {
    updateDisabledPieces(board, availablePieces);
  }, [board, availablePieces]);

  const handleDragStart = (pieceType: PieceName) => {
    // Só permite arrastar se a peça não estiver desativada
    if (!disabledPieces.has(pieceType)) {
      setCurrentDragType(pieceType);
    }
  };

  const handleDragEnd = () => {
    setCurrentDragType(null);
    setHoverIndex(null);
    setHoverPieceType(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const pieceType = currentDragType;
    if (!pieceType) return;
    const piece = PIECE_DEFINITIONS[pieceType];
    if (!piece) return;

    const baseIndex = dropIndex - dragOffset;
    if (isOutOfBounds(baseIndex, piece, 10, 10)) return;

    const pieceIndices = getPieceIndices(baseIndex, piece, 10);
    const hasCollision = pieceIndices.some(i => board[i] !== null);
    if (hasCollision) {
      handleDragEnd();
      return;
    }

    // Adiciona a peça ao tabuleiro
    const newBoard = [...board];
    pieceIndices.forEach(i => { newBoard[i] = pieceType; });
    
    // Verifica e remove linhas/colunas completas
    const result = checkAndRemoveCompletedLines(newBoard, 10, 10);
    
    setBoard(result.board);
    
    // Adiciona 4 pontos pela peça colocada
    let pointsToAdd = 4;
    
    // Adiciona 10 pontos por cada linha completada
    pointsToAdd += result.completedLines * 10;
    
    // Adiciona 10 pontos por cada coluna completada
    pointsToAdd += result.completedColumns * 10;
    
    setScore(prevScore => prevScore + pointsToAdd);
    
    handleDragEnd();
    
    // Substitui a peça usada por uma nova peça aleatória
    const newPieces = [...availablePieces];
    const usedPieceIndex = newPieces.indexOf(pieceType);
    if (usedPieceIndex !== -1) {
      // Gera uma nova peça que não está nas peças atuais
      const availableNewPieces = ALL_PIECE_TYPES.filter(type => !newPieces.includes(type));
      // Se não houver peças disponíveis, usa todas as peças (incluindo as que já estão na vitrine)
      const piecesToChooseFrom = availableNewPieces.length > 0 ? availableNewPieces : ALL_PIECE_TYPES;
      const randomNewPiece = piecesToChooseFrom[Math.floor(Math.random() * piecesToChooseFrom.length)];
      newPieces[usedPieceIndex] = randomNewPiece;
      setAvailablePieces(newPieces);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!currentDragType) return;
    setHoverPieceType(currentDragType);
    setHoverIndex(index - dragOffset);
  };

  const handleDragLeave = () => {
    setHoverIndex(null);
    setHoverPieceType(null);
  };

  const isHoverCell = (cellIndex: number): boolean => {
    if (hoverIndex === null || hoverPieceType === null) return false;
    const piece = PIECE_DEFINITIONS[hoverPieceType];
    if (!piece) return false;
    const baseIndex = hoverIndex;
    if (isOutOfBounds(baseIndex, piece, 10, 10)) return false;
    const pieceIndices = getPieceIndices(baseIndex, piece, 10);
    return pieceIndices.includes(cellIndex);
  };

  const getHoverColor = (cellIndex: number): string => {
    if (!isHoverCell(cellIndex)) return 'bg-gray-700';
    const baseIndex = hoverIndex!;
    const piece = PIECE_DEFINITIONS[hoverPieceType!];
    let hasCollision = false;
    let outOfBounds = isOutOfBounds(baseIndex, piece, 10, 10);
    if (!outOfBounds) {
      const pieceIndices = getPieceIndices(baseIndex, piece, 10);
      hasCollision = pieceIndices.some(i => board[i] !== null);
    }
    if (outOfBounds || hasCollision) return 'bg-red-300';
    // Cores por tipo
    switch (piece.color) {
      case 'blue':
        return 'bg-blue-300';
      case 'yellow':
        return 'bg-yellow-200';
      case 'teal':
        return 'bg-teal-200';
      case 'green':
        return 'bg-green-200';
      case 'red':
        return 'bg-red-200';
      case 'purple':
        return 'bg-purple-200';
      case 'indigo':
        return 'bg-indigo-200';
      case 'pink':
        return 'bg-pink-200';
      // adicione outros casos conforme necessário
      default:
        return 'bg-gray-700';
    }
  }

  // Função para renderizar uma peça baseada no tipo
  const renderPiece = (pieceType: PieceName) => {
    const isDisabled = disabledPieces.has(pieceType);
    
    const props = {
      pieceName: pieceType,
      setDragOffset,
      onDragStart: () => handleDragStart(pieceType),
      isDisabled
    };

    const parts = pieceType.split('-');
    const baseType = parts.slice(0, -1).join('-');
    
    switch (baseType) {
      case 'line':
        return <PieceLine key={pieceType} {...props} />;
      case 'square':
        return <PieceSquare key={pieceType} {...props} />;
      case 'right-hook':
        return <PieceRightHook key={pieceType} {...props} />;
      case 'left-hook':
        return <PieceLeftHook key={pieceType} {...props} />;
      case 'tee':
        return <PieceTee key={pieceType} {...props} />;
      case 'right-curve':
        return <PieceRightCurve key={pieceType} {...props} />;
      case 'left-curve':
        return <PieceLeftCurve key={pieceType} {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tetris</h1>
      <div className="text-2xl font-semibold mb-4 text-white">
        Pontuação: {score}
      </div>
      <div className="grid grid-cols-10 gap-1 bg-gray-800 p-2 rounded-lg">
        {board.map((cell, index) => {
          const baseColor =
            cell === 'line-0' || cell === 'line-90'
              ? 'bg-blue-600'
              : cell === 'square-0'
              ? 'bg-yellow-500'
              : cell === 'right-hook-0' || cell === 'right-hook-90' || cell === 'right-hook-180' || cell === 'right-hook-270'
              ? 'bg-teal-500'
              : cell === 'left-hook-0' || cell === 'left-hook-90' || cell === 'left-hook-180' || cell === 'left-hook-270'
              ? 'bg-red-500'
              : cell === 'tee-0' || cell === 'tee-90' || cell === 'tee-180' || cell === 'tee-270'
              ? 'bg-purple-500'
              : cell === 'right-curve-0' || cell === 'right-curve-90' || cell === 'right-curve-180' || cell === 'right-curve-270'
              ? 'bg-indigo-500'
              : cell === 'left-curve-0' || cell === 'left-curve-90' || cell === 'left-curve-180' || cell === 'left-curve-270'
              ? 'bg-pink-500'
              : getHoverColor(index);
          return (
            <div
              key={index}
              onDrop={e => handleDrop(e, index)}
              onDragOver={e => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              className={`w-8 h-8 rounded-sm transition-colors ${baseColor}`}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex h-30 w-full items-center justify-center mb-4 gap-4">
          {availablePieces.length === 0 ? (
            <div>Carregando...</div>
          ) : (
            // Garante que sempre renderizamos 3 slots
            Array.from({ length: 3 }).map((_, index) => {
              const pieceType = availablePieces[index];
              return (
                <div key={index} className="w-40 h-40 flex items-center justify-center">
                  {pieceType ? renderPiece(pieceType) : <div>Carregando...</div>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}