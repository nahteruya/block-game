// src/components/Piece/Piece.tsx
import type { PieceColor, PieceDefinition } from '@/pieces/types';

type PieceProps = {
  piece: PieceDefinition;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
};

const mapColor: Record<PieceColor, string> = {
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  teal: 'bg-teal-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  indigo: 'bg-indigo-500',
}

const Piece = ({ piece, setDragOffset, onDragStart }: PieceProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const blockSize = 32 + 4;
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const col = Math.floor(offsetX / blockSize);
    const row = Math.floor(offsetY / blockSize);
    const boardWidth = 10;
    const dragOffsetValue = row * boardWidth + col;
    setDragOffset(dragOffsetValue);
    onDragStart();
  };

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[piece.width];

  return (
    <div
      className={`grid ${gridColsClass} gap-1 p-2 cursor-grab`}
      draggable
      onDragStart={handleDragStart}
    >
      {Array.from({ length: piece.height }).map((_, row) =>
        Array.from({ length: piece.width }).map((_, col) => {
          const isBlock = piece.shape.some(([dy, dx]) => dy === row && dx === col);
          return (
            <div
              key={`${row}-${col}`}
              className={`w-8 h-8 rounded-sm ${isBlock ? mapColor[piece.color] : 'bg-transparent'}`}
            />
          );
        })
      )}
    </div>
  );
};

export default Piece;