// src/components/Piece/PieceL.tsx
import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceRightHook = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS["right-hook"]} {...props} />
);

export default PieceRightHook;