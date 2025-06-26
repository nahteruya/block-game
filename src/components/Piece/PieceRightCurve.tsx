import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceRightCurveProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
  isDisabled?: boolean;
};

const PieceRightCurve = ({ pieceName, ...props }: PieceRightCurveProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceRightCurve; 