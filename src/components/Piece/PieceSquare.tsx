// src/components/Piece/PieceSquare.tsx
import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceSquareProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
  isDisabled?: boolean;
};

const PieceSquare = ({ pieceName, ...props }: PieceSquareProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceSquare;