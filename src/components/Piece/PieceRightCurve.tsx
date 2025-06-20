import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceRightCurve = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS["right-curve"]} {...props} />
);

export default PieceRightCurve; 