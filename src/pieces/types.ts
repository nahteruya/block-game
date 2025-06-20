export type PieceName = 'line' | 'square' | 'right-hook';
export type PieceColor = 'blue' | 'yellow' | 'teal';
export type PieceDefinition = {
  name: PieceName;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};