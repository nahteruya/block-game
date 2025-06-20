// src/pieces/utils.ts
import type { PieceDefinition } from './types';

export function getPieceIndices(
  baseIndex: number,
  piece: PieceDefinition,
  boardWidth: number
): number[] {
  const baseRow = Math.floor(baseIndex / boardWidth);
  const baseCol = baseIndex % boardWidth;
  return piece.shape.map(([dy, dx]) =>
    (baseRow + dy) * boardWidth + (baseCol + dx)
  );
}

export function isOutOfBounds(
  baseIndex: number,
  piece: PieceDefinition,
  boardWidth: number,
  boardHeight: number
): boolean {
  const baseRow = Math.floor(baseIndex / boardWidth);
  const baseCol = baseIndex % boardWidth;
  return (
    baseCol < 0 ||
    baseCol + piece.width > boardWidth ||
    baseRow < 0 ||
    baseRow + piece.height > boardHeight
  );
}