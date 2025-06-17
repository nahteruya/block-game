type PieceSquareProps = {
  setDragOffset: (offset: number) => void;
  onDragStart: () => void; // ✅ Nova prop
};

const PieceSquare = ({ setDragOffset, onDragStart }: PieceSquareProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const blockSize = 32 + 4; // 32px largura (w-8) + 4px gap
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;

    const col = Math.floor(offsetX / blockSize); // 0 ou 1
    const row = Math.floor(offsetY / blockSize); // 0 ou 1

    const blockIndex = row * 10 + col; // convertendo para índice de board
    setDragOffset(blockIndex);
    onDragStart(); // ✅ Chamar callback para informar o tipo
  };

  return (
    <div
      className="grid grid-cols-2 gap-1 p-2 cursor-grab"
      draggable
      onDragStart={handleDragStart}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-8 h-8 bg-yellow-500 rounded-sm"
        />
      ))}
    </div>
  );
};

export default PieceSquare;
export { PieceSquare };