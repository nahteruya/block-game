import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceLeftHook = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS["left-hook"]} {...props} />
);

export default PieceLeftHook; 