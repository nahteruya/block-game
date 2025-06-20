import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceLeftCurve = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS["left-curve"]} {...props} />
);

export default PieceLeftCurve; 