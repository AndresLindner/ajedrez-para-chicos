export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  id?: string;
  hasMoved?: boolean;
}

export type SpecialItem = 'cookie' | 'star' | 'jewel' | 'apple' | 'fence';

export interface SquareContent {
  piece?: Piece | null;
  item?: SpecialItem | null;
}

export type BoardState = (SquareContent | null)[][];

export interface Position {
  row: number;
  col: number;
}

export type AppMode = 'ori' | 'emily' | 'free' | 'guide';

export type OriGame = 'tower' | 'bishop' | 'queen' | 'king' | 'knight' | 'mini-pawn';
export type EmilyGame = 'pawn-wars' | 'save-king' | 'checkmate-1';
