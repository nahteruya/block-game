import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceLeftCurveProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
  isDisabled?: boolean;
};

const PieceLeftCurve = ({ pieceName, ...props }: PieceLeftCurveProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceLeftCurve; 