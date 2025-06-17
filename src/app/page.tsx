'use client';
import { useState } from 'react';
import PieceLine from "@/components/PieceLine/PieceLine";
import PieceSquare from "@/components/PieceSquare/PieceSquare";

export default function Home() {
  const [board, setBoard] = useState(Array(100).fill(null));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hoverPieceType, setHoverPieceType] = useState<string | null>(null);
  
  const [currentDragType, setCurrentDragType] = useState<string | null>(null);

  const handleDragStart = (pieceType: string) => {
    setCurrentDragType(pieceType);
  };

  const handleDragEnd = () => {
    setCurrentDragType(null);
    setHoverIndex(null);
    setHoverPieceType(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const pieceType = currentDragType; // ✅ Usar o estado em vez de dataTransfer
    if (!pieceType) return;

    const baseIndex = dropIndex - dragOffset;

    if (pieceType === 'line') {
      const col = baseIndex % 10;

      // 🚫 Verificar se a peça ultrapassa os limites laterais
      if (col < 0 || col > 6) return;

      // ✅ Calcular as posições que a peça ocuparia
      const pieceIndices = Array.from({ length: 4 }, (_, i) => baseIndex + i);

      // 🚫 Verificar colisão
      const hasCollision = pieceIndices.some(i => board[i] !== null);
      if (hasCollision) {
        handleDragEnd();
        return;
      };

      // ✅ Se não houver colisão, atualizar o board
      const newBoard = [...board];
      pieceIndices.forEach(i => {
        newBoard[i] = 'line';
      });
      setBoard(newBoard);
    }

    if (pieceType === 'square') {
      const col = baseIndex % 10;
      const row = Math.floor(baseIndex / 10);

      // fora do board lateral ou inferior
      if (col > 8 || row > 8) {
        handleDragEnd();
        return;
      }

      const pieceIndices = [baseIndex, baseIndex + 1, baseIndex + 10, baseIndex + 11];
      const hasCollision = pieceIndices.some(i => board[i] !== null);
      if (hasCollision) {
        handleDragEnd();
        return;
      }

      const newBoard = [...board];
      pieceIndices.forEach(i => {
        newBoard[i] = 'square';
      });
      setBoard(newBoard);
    }

    handleDragEnd();
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    // ✅ Usar o estado em vez de dataTransfer
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

    const baseIndex = hoverIndex;
    const col = baseIndex % 10;
    const row = Math.floor(baseIndex / 10);

    if (hoverPieceType === 'line') {
      // fora do board horizontal
      if (col < 0 || col > 6) return false;

      const pieceIndices = Array.from({ length: 4 }, (_, i) => baseIndex + i);
      return pieceIndices.includes(cellIndex);
    }

    if (hoverPieceType === 'square') {
      // fora do board lateral ou inferior
      if (col > 8 || row > 8) return false;

      const squareIndices = [baseIndex, baseIndex + 1, baseIndex + 10, baseIndex + 11];
      return squareIndices.includes(cellIndex);
    }

    return false;
  };

  const getHoverColor = (cellIndex: number): string => {
    if (!isHoverCell(cellIndex)) return 'bg-gray-700';
    
    // ✅ Verificar se a posição seria válida para colorir adequadamente
    const baseIndex = hoverIndex!;
    const col = baseIndex % 10;
    const row = Math.floor(baseIndex / 10);
    
    let hasCollision = false;
    let isOutOfBounds = false;

    if (hoverPieceType === 'line') {
      isOutOfBounds = col < 0 || col > 6;
      if (!isOutOfBounds) {
        const pieceIndices = Array.from({ length: 4 }, (_, i) => baseIndex + i);
        hasCollision = pieceIndices.some(i => board[i] !== null);
      }
      
      // Azul claro se válido, vermelho se inválido
      return isOutOfBounds || hasCollision ? 'bg-red-300' : 'bg-blue-300';
    }

    if (hoverPieceType === 'square') {
      isOutOfBounds = col > 8 || row > 8;
      if (!isOutOfBounds) {
        const squareIndices = [baseIndex, baseIndex + 1, baseIndex + 10, baseIndex + 11];
        hasCollision = squareIndices.some(i => board[i] !== null);
      }
      
      // Amarelo claro se válido, vermelho se inválido
      return isOutOfBounds || hasCollision ? 'bg-red-300' : 'bg-yellow-200';
    }

    return 'bg-gray-700';
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
                : getHoverColor(index);

          return (
            <div
              key={index}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              className={`w-8 h-8 rounded-sm transition-colors ${baseColor}`}
            />
          );
        })}
      </div>

      <div className="flex h-30 w-full items-center justify-center mt-4">
        <PieceLine setDragOffset={setDragOffset} onDragStart={() => handleDragStart('line')} />
        <PieceSquare setDragOffset={setDragOffset} onDragStart={() => handleDragStart('square')} />
      </div>
    </main>
  );
}