export type PieceColor = 'blue' | 'yellow';
export type PieceDefinition = {
  name: string;
  color: PieceColor;
  shape: [number, number][];
  width: number;
  height: number;
};