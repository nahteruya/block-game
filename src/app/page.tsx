'use client';
import { useState } from 'react';
import PieceLine from "@/components/PieceLine/PieceLine";

export default function Home() {
  const [board, setBoard] = useState(Array(100).fill(null));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0); // usado para hover e drop

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
  e.preventDefault();
  const pieceType = e.dataTransfer.getData('pieceType');
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
      setHoverIndex(null);
      return;
    };

    // ✅ Se não houver colisão, atualizar o board
    const newBoard = [...board];
    pieceIndices.forEach(i => {
      newBoard[i] = 'line';
    });
    setBoard(newBoard);
  }
  setHoverIndex(null);
};


  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoverIndex(index - dragOffset); // calcula o início da peça
  };

  const handleDragLeave = () => {
    setHoverIndex(null);
  };

  const isHoverCell = (cellIndex: number): boolean => {
    if (hoverIndex === null) return false;

    const col = hoverIndex % 10;
    if (col < 0 || col > 6) return false;

    return Array.from({ length: 4 }, (_, i) => hoverIndex + i).includes(cellIndex);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tetris</h1>

      <div className="grid grid-cols-10 gap-1 bg-gray-800 p-2 rounded-lg">
        {board.map((cell, index) => {
          const baseColor = cell === 'line'
            ? 'bg-blue-600'
            : isHoverCell(index)
              ? 'bg-blue-300'
              : 'bg-gray-700';

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
        <PieceLine setDragOffset={setDragOffset} />
      </div>
    </main>
  );
}
