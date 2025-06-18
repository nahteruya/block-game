// src/pieces/definitions.ts
import { PieceDefinition } from './types';

export const PIECE_DEFINITIONS: Record<string, PieceDefinition> = {
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
  // Adicione outras peças aqui (T, L, Z, etc.)
};