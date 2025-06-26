// src/pieces/utils.ts
import type { PieceDefinition, PieceName, BasePieceName } from './types';

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

// Função para verificar se uma linha está completa
export function isLineComplete(
  board: (string | null)[],
  row: number,
  boardWidth: number
): boolean {
  const startIndex = row * boardWidth;
  const endIndex = startIndex + boardWidth;
  return board.slice(startIndex, endIndex).every(cell => cell !== null);
}

// Função para verificar se uma coluna está completa
export function isColumnComplete(
  board: (string | null)[],
  col: number,
  boardWidth: number,
  boardHeight: number
): boolean {
  for (let row = 0; row < boardHeight; row++) {
    const index = row * boardWidth + col;
    if (board[index] === null) {
      return false;
    }
  }
  return true;
}

// Função para remover uma linha e fazer as peças caírem
export function removeLine(
  board: (string | null)[],
  row: number,
  boardWidth: number,
  boardHeight: number
): (string | null)[] {
  const newBoard = [...board];
  
  // Remove a linha (preenche com null)
  const startIndex = row * boardWidth;
  const endIndex = startIndex + boardWidth;
  for (let i = startIndex; i < endIndex; i++) {
    newBoard[i] = null;
  }
  
  return newBoard;
}

// Função para remover uma coluna e fazer as peças deslizarem
export function removeColumn(
  board: (string | null)[],
  col: number,
  boardWidth: number,
  boardHeight: number
): (string | null)[] {
  const newBoard = [...board];
  
  // Remove a coluna (preenche com null)
  for (let row = 0; row < boardHeight; row++) {
    const index = row * boardWidth + col;
    newBoard[index] = null;
  }
  
  return newBoard;
}

// Função principal para verificar e remover linhas e colunas completas
export function checkAndRemoveCompletedLines(
  board: (string | null)[],
  boardWidth: number,
  boardHeight: number
): (string | null)[] {
  let newBoard = [...board];
  let hasChanges = false;
  
  // Verifica e remove linhas completas (de baixo para cima)
  for (let row = boardHeight - 1; row >= 0; row--) {
    if (isLineComplete(newBoard, row, boardWidth)) {
      newBoard = removeLine(newBoard, row, boardWidth, boardHeight);
      hasChanges = true;
    }
  }
  
  // Verifica e remove colunas completas (da direita para a esquerda)
  for (let col = boardWidth - 1; col >= 0; col--) {
    if (isColumnComplete(newBoard, col, boardWidth, boardHeight)) {
      newBoard = removeColumn(newBoard, col, boardWidth, boardHeight);
      hasChanges = true;
    }
  }
  
  // Se houve mudanças, verifica novamente (pode haver novas linhas/colunas completas)
  if (hasChanges) {
    return checkAndRemoveCompletedLines(newBoard, boardWidth, boardHeight);
  }
  
  return newBoard;
}

// Função para rotacionar uma forma de peça
export function rotateShape(shape: [number, number][], rotation: number): [number, number][] {
  const rotations = rotation / 90;
  let rotatedShape = [...shape];
  
  for (let i = 0; i < rotations; i++) {
    rotatedShape = rotatedShape.map(([row, col]) => [-col, row]);
  }
  
  // Normalizar para coordenadas não-negativas
  const minRow = Math.min(...rotatedShape.map(([row]) => row));
  const minCol = Math.min(...rotatedShape.map(([, col]) => col));
  
  return rotatedShape.map(([row, col]) => [row - minRow, col - minCol]);
}

// Função para calcular dimensões de uma forma rotacionada
export function calculateRotatedDimensions(shape: [number, number][]): { width: number; height: number } {
  const maxRow = Math.max(...shape.map(([row]) => row));
  const maxCol = Math.max(...shape.map(([, col]) => col));
  return { width: maxCol + 1, height: maxRow + 1 };
}

// Função para extrair o nome base de uma peça (sem rotação)
export function getBasePieceName(pieceName: PieceName): BasePieceName {
  return pieceName.split('-').slice(0, -1).join('-') as BasePieceName;
}

// Função para extrair a rotação de uma peça
export function getPieceRotation(pieceName: PieceName): number {
  const rotation = pieceName.split('-').pop();
  return rotation ? parseInt(rotation) : 0;
}