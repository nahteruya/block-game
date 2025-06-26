import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceTeeProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
  isDisabled?: boolean;
};

const PieceTee = ({ pieceName, ...props }: PieceTeeProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceTee; 