// src/components/Piece/PieceLine.tsx
import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceLineProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
};

const PieceLine = ({ pieceName, ...props }: PieceLineProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceLine;