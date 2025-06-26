// src/components/Piece/PieceRightHook.tsx
import Piece from './Piece';
import type { PieceName } from '@/pieces/types';

type PieceRightHookProps = {
  pieceName: PieceName;
  setDragOffset: (offset: number) => void;
  onDragStart: () => void;
};

const PieceRightHook = ({ pieceName, ...props }: PieceRightHookProps) => (
  <Piece pieceName={pieceName} {...props} />
);

export default PieceRightHook;