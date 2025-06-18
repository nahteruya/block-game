// src/components/Piece/PieceLine.tsx
import Piece from './Piece';
import { PIECE_DEFINITIONS } from '@/pieces/definitions';

const PieceLine = (props: { setDragOffset: (offset: number) => void; onDragStart: () => void }) => (
  <Piece piece={PIECE_DEFINITIONS.line} {...props} />
);

export default PieceLine;