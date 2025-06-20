export type PieceName = 'line' | 'square' | 'right-hook' | 'left-hook' | 'tee' | 'right-curve';
export type PieceColor = 'blue' | 'yellow' | 'teal' | 'green' | 'red' | 'purple' | 'indigo';
export type PieceDefinition = {
  name: PieceName;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};