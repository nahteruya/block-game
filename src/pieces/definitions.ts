// src/pieces/definitions.ts
import type { PieceDefinition, PieceName } from './types';

export const PIECE_DEFINITIONS: Record<PieceName, PieceDefinition> = {
  line: {
    name: 'line',
    color: 'blue',
    shape: [
      [0, 0], [0, 1], [0, 2], [0, 3]
    ],
    width: 4,
    height: 1,
  },
  square: {
    name: 'square',
    color: 'yellow',
    shape: [
      [0, 0], [0, 1], [1, 0], [1, 1]
    ],
    width: 2,
    height: 2,
  },
  "right-hook": {
    name: 'right-hook',
    color: 'teal',
    shape: [
      [0, 0], [1, 0], [2, 0], [2, 1]
    ],
    width: 2,
    height: 3,
  },
  "left-hook": {
    name: 'left-hook',
    color: 'red',
    shape: [
      [0, 1], [1, 1], [2, 0], [2, 1]
    ],
    width: 2,
    height: 3,
  }
  // Adicione outras peças aqui (T, L, Z, etc.)
};