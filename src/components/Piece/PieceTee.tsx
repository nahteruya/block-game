import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceTee = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS["tee"]} {...props} />
);

export default PieceTee; 