import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceLeftHookProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
  isDisabled?: boolean;
};

const PieceLeftHook = ({ pieceName, ...props }: PieceLeftHookProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceLeftHook; 