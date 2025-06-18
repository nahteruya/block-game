// src/components/Piece/PieceSquare.tsx
import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceSquare = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS.square} {...props} />
);

export default PieceSquare;