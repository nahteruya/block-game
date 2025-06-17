type PieceLineProps = {
  setDragOffset: (offset: number) => void;
};

const PieceLine = ({ setDragOffset }: PieceLineProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const blockSize = 32 + 4; // largura do bloco (Tailwind: w-8 = 32px) + gap
    const offsetX = e.nativeEvent.offsetX;
    const blockIndex = Math.floor(offsetX / blockSize);

    setDragOffset(blockIndex);
    e.dataTransfer.setData('pieceType', 'line');
  };

  return (
    <div
      className="grid grid-cols-4 gap-1 p-2 cursor-grab"
      draggable
      onDragStart={handleDragStart}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-8 h-8 bg-blue-600 rounded-sm"
        />
      ))}
    </div>
  );
};

export default PieceLine;
export { PieceLine };
