export type PieceName = 
  // Line variations (only unique ones: 0° and 90°)
  | 'line-0' | 'line-90'
  // Square variations (only one needed since all rotations are the same)
  | 'square-0'
  // Right-hook variations
  | 'right-hook-0' | 'right-hook-90' | 'right-hook-180' | 'right-hook-270'
  // Left-hook variations
  | 'left-hook-0' | 'left-hook-90' | 'left-hook-180' | 'left-hook-270'
  // Tee variations
  | 'tee-0' | 'tee-90' | 'tee-180' | 'tee-270'
  // Right-curve variations
  | 'right-curve-0' | 'right-curve-90' | 'right-curve-180' | 'right-curve-270'
  // Left-curve variations
  | 'left-curve-0' | 'left-curve-90' | 'left-curve-180' | 'left-curve-270';

export type PieceColor = 'blue' | 'yellow' | 'teal' | 'green' | 'red' | 'purple' | 'indigo' | 'pink';

export type PieceDefinition = {
  name: PieceName;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};

// Helper type to get base piece name without rotation
export type BasePieceName = 'line' | 'square' | 'right-hook' | 'left-hook' | 'tee' | 'right-curve' | 'left-curve';