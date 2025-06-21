"use client"
import { useState } from "react";
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

// Array com todos os tipos de peças disponíveis
const ALL_PIECE_TYPES: PieceName[] = [
  'line',
  'square',
  'right-hook',
  'left-hook',
  'tee',
  'right-curve',
  'left-curve'
];

// Função para gerar 3 peças aleatórias
const generateRandomPieces = (): PieceName[] => {
  const shuffled = [...ALL_PIECE_TYPES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

export default function Home() {
  const [board, setBoard] = useState(Array(100).fill(null));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hoverPieceType, setHoverPieceType] = useState<PieceName | null>(null);
  const [currentDragType, setCurrentDragType] = useState<PieceName | null>(null);
  const [availablePieces, setAvailablePieces] = useState<PieceName[]>(generateRandomPieces());

  const handleDragStart = (pieceType: PieceName) => setCurrentDragType(pieceType);

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
    const updatedBoard = checkAndRemoveCompletedLines(newBoard, 10, 10);
    
    setBoard(updatedBoard);
    handleDragEnd();
    
    // Substitui a peça usada por uma nova peça aleatória
    const newPieces = [...availablePieces];
    const usedPieceIndex = newPieces.indexOf(pieceType);
    if (usedPieceIndex !== -1) {
      // Gera uma nova peça que não está nas peças atuais
      const availableNewPieces = ALL_PIECE_TYPES.filter(type => !newPieces.includes(type));
      if (availableNewPieces.length > 0) {
        const randomNewPiece = availableNewPieces[Math.floor(Math.random() * availableNewPieces.length)];
        newPieces[usedPieceIndex] = randomNewPiece;
        setAvailablePieces(newPieces);
      }
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
    const props = {
      setDragOffset,
      onDragStart: () => handleDragStart(pieceType)
    };

    switch (pieceType) {
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
      <div className="grid grid-cols-10 gap-1 bg-gray-800 p-2 rounded-lg">
        {board.map((cell, index) => {
          const baseColor =
            cell === 'line'
              ? 'bg-blue-600'
              : cell === 'square'
              ? 'bg-yellow-500'
              : cell === 'right-hook'
              ? 'bg-teal-500'
              : cell === 'left-hook'
              ? 'bg-red-500'
              : cell === 'tee'
              ? 'bg-purple-500'
              : cell === 'right-curve'
              ? 'bg-indigo-500'
              : cell === 'left-curve'
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
          {availablePieces.map(pieceType => (
            <div key={pieceType} className="w-40 h-40 flex items-center justify-center">
              {renderPiece(pieceType)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}