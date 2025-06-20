export type PieceName = 'line' | 'square' | 'right-hook' | 'left-hook' | 'tee';
export type PieceColor = 'blue' | 'yellow' | 'teal' | 'green' | 'red' | 'purple';
export type PieceDefinition = {
  name: PieceName;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};