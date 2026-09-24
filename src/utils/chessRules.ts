import { BoardState, Position, PieceColor } from '../types/chess';

export const isWithinBoard = (r: number, c: number): boolean => {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
};

// Returns all valid moves for a piece on the board, including item collections
export const getValidMoves = (
  r: number,
  c: number,
  board: BoardState,
  options: { allowItemCollection?: boolean; ignoreCheck?: boolean } = { allowItemCollection: true }
): Position[] => {
  const content = board[r]?.[c];
  if (!content || !content.piece) return [];

  const { type, color } = content.piece;
  const moves: Position[] = [];

  const addIfValid = (targetR: number, targetC: number): boolean => {
    if (!isWithinBoard(targetR, targetC)) return false;
    const dest = board[targetR][targetC];

    // If destination has an item and item collection is allowed
    if (dest && dest.item && options.allowItemCollection) {
      moves.push({ row: targetR, col: targetC });
      return false; // Can collect item and stop or continue depending on piece, but for items usually stops on that square
    }

    // If square is empty
    if (!dest || (!dest.piece && !dest.item)) {
      moves.push({ row: targetR, col: targetC });
      return true; // continue sliding
    }

    // If destination has a piece
    if (dest.piece) {
      if (dest.piece.color !== color) {
        moves.push({ row: targetR, col: targetC }); // Capture
      }
      return false; // Friendly or enemy piece blocks further sliding
    }

    return false;
  };

  // Sliding moves helper (Rook, Bishop, Queen)
  const slide = (directions: [number, number][]) => {
    for (const [dr, dc] of directions) {
      let curR = r + dr;
      let curC = c + dc;
      while (isWithinBoard(curR, curC)) {
        const canContinue = addIfValid(curR, curC);
        if (!canContinue) break;
        curR += dr;
        curC += dc;
      }
    }
  };

  switch (type) {
    case 'r': // Torre
      slide([[-1, 0], [1, 0], [0, -1], [0, 1]]);
      break;

    case 'b': // Alfil
      slide([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
      break;

    case 'q': // Reina
      slide([
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
      ]);
      break;

    case 'k': // Rey (1 paso)
      {
        const kingDirs = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        for (const [dr, dc] of kingDirs) {
          const tr = r + dr;
          const tc = c + dc;
          if (isWithinBoard(tr, tc)) {
            const dest = board[tr][tc];
            if (!dest || !dest.piece || dest.piece.color !== color) {
              moves.push({ row: tr, col: tc });
            }
          }
        }
      }
      break;

    case 'n': // Caballo ("L" - Salta piezas!)
      {
        const knightJumps = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2],  [1, 2],  [2, -1],  [2, 1]
        ];
        for (const [dr, dc] of knightJumps) {
          const tr = r + dr;
          const tc = c + dc;
          if (isWithinBoard(tr, tc)) {
            const dest = board[tr][tc];
            // Caballo can jump over any piece! It only checks the destination square
            if (!dest || (!dest.piece && (!dest.item || options.allowItemCollection)) || (dest.piece && dest.piece.color !== color)) {
              moves.push({ row: tr, col: tc });
            }
          }
        }
      }
      break;

    case 'p': // Peón
      {
        const dir = color === 'w' ? -1 : 1;
        const startRow = color === 'w' ? 6 : 1;

        // 1 paso al frente
        const frontR = r + dir;
        if (isWithinBoard(frontR, c) && (!board[frontR][c] || (!board[frontR][c]!.piece && !board[frontR][c]!.item))) {
          moves.push({ row: frontR, col: c });

          // 2 pasos de impulso al inicio
          const doubleFrontR = r + dir * 2;
          if (r === startRow && isWithinBoard(doubleFrontR, c) && (!board[doubleFrontR][c] || (!board[doubleFrontR][c]!.piece && !board[doubleFrontR][c]!.item))) {
            moves.push({ row: doubleFrontR, col: c });
          }
        }

        // Captura en diagonal (o recolección de item en diagonal)
        for (const dc of [-1, 1]) {
          const diagR = r + dir;
          const diagC = c + dc;
          if (isWithinBoard(diagR, diagC)) {
            const dest = board[diagR][diagC];
            if (dest) {
              if (dest.piece && dest.piece.color !== color) {
                moves.push({ row: diagR, col: diagC });
              } else if (dest.item && options.allowItemCollection) {
                moves.push({ row: diagR, col: diagC });
              }
            }
          }
        }
      }
      break;
  }

  return moves;
};

// Check if a square is attacked by opponent pieces
export const isSquareAttacked = (
  targetR: number,
  targetC: number,
  byColor: PieceColor,
  board: BoardState
): boolean => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = board[r][c];
      if (square?.piece && square.piece.color === byColor) {
        // Generate pseudo-legal moves for attacker
        const moves = getValidMoves(r, c, board, { allowItemCollection: false, ignoreCheck: true });
        if (moves.some((m) => m.row === targetR && m.col === targetC)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Find the King of a specific color
export const findKing = (board: BoardState, color: PieceColor): Position | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]?.piece;
      if (p && p.type === 'k' && p.color === color) {
        return { row: r, col: c };
      }
    }
  }
  return null;
};

// Check if the King of a given color is in check
export const isKingInCheck = (board: BoardState, kingColor: PieceColor): boolean => {
  const kingPos = findKing(board, kingColor);
  if (!kingPos) return false;
  const enemyColor: PieceColor = kingColor === 'w' ? 'b' : 'w';
  return isSquareAttacked(kingPos.row, kingPos.col, enemyColor, board);
};

// Helper to create an empty 8x8 board
export const createEmptyBoard = (): BoardState => {
  return Array(8).fill(null).map(() => Array(8).fill(null));
};
