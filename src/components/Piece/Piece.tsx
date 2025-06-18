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
}

const Piece = ({ piece, setDragOffset, onDragStart }: PieceProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const blockSize = 32 + 4;
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const col = Math.floor(offsetX / blockSize);
    const row = Math.floor(offsetY / blockSize);
    const blockIndex = row * piece.width + col;
    setDragOffset(blockIndex);
    onDragStart();
  };

  return (
    <div
      className={`grid grid-cols-${piece.width} gap-1 p-2 cursor-grab`}
      draggable
      onDragStart={handleDragStart}
    >
      {Array.from({ length: piece.shape.length }).map((_, idx) => (
        <div
          key={idx}
          className={`w-8 h-8 ${mapColor[piece.color]} rounded-sm`}
        />
      ))}
    </div>
  );
};

export default Piece;