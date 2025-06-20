export type PieceName = 'line' | 'square' | 'right-hook' | 'left-hook';
export type PieceColor = 'blue' | 'yellow' | 'teal' | 'green' | 'red';
export type PieceDefinition = {
  name: PieceName;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};