// src/pieces/definitions.ts
import type { PieceDefinition, PieceName } from './types';
import { rotateShape, calculateRotatedDimensions } from './utils';

// Definições base das peças (forma original)
const BASE_PIECE_SHAPES: Record<string, [number, number][]> = {
  line: [
    [0, 0], [0, 1], [0, 2], [0, 3]
  ],
  square: [
    [0, 0], [0, 1], [1, 0], [1, 1]
  ],
  "right-hook": [
    [0, 0], [1, 0], [2, 0], [2, 1]
  ],
  "left-hook": [
    [0, 1], [1, 1], [2, 0], [2, 1]
  ],
  "tee": [
    [0, 1], [1, 0], [1, 1], [1, 2]
  ],
  "right-curve": [
    [0, 0], [0, 1], [1, 1], [1, 2]
  ],
  "left-curve": [
    [0, 1], [0, 2], [1, 0], [1, 1]
  ]
};

const PIECE_COLORS: Record<string, 'blue' | 'yellow' | 'teal' | 'green' | 'red' | 'purple' | 'indigo' | 'pink'> = {
  line: 'blue',
  square: 'yellow',
  'right-hook': 'teal',
  'left-hook': 'red',
  'tee': 'purple',
  'right-curve': 'indigo',
  'left-curve': 'pink'
};

// Função para gerar todas as variações de uma peça
function generatePieceVariations(baseName: keyof typeof BASE_PIECE_SHAPES): Record<string, PieceDefinition> {
  const baseShape = BASE_PIECE_SHAPES[baseName];
  const color = PIECE_COLORS[baseName];
  const variations: Record<string, PieceDefinition> = {};
  
  [0, 90, 180, 270].forEach(rotation => {
    const rotatedShape = rotateShape(baseShape, rotation);
    const dimensions = calculateRotatedDimensions(rotatedShape);
    const pieceName = `${baseName}-${rotation}` as PieceName;
    
    variations[pieceName] = {
      name: pieceName,
      color,
      shape: rotatedShape,
      width: dimensions.width,
      height: dimensions.height,
    };
  });
  
  return variations;
}

// Gerar todas as definições de peças com suas variações
export const PIECE_DEFINITIONS: Record<PieceName, PieceDefinition> = Object.assign(
  {},
  generatePieceVariations('line'),
  generatePieceVariations('square'),
  generatePieceVariations('right-hook'),
  generatePieceVariations('left-hook'),
  generatePieceVariations('tee'),
  generatePieceVariations('right-curve'),
  generatePieceVariations('left-curve'),
);