import React from 'react';
import { BoardState, Position } from '../types/chess';
import { ChessPiece, ItemPiece } from './ChessPiece';

interface ChessBoardProps {
  board: BoardState;
  selectedPos: Position | null;
  validMoves: Position[];
  onSquareClick: (row: number, col: number) => void;
  checkPos?: Position | null;
  flipped?: boolean;
  showCoordinates?: boolean;
  interactive?: boolean;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedPos,
  validMoves,
  onSquareClick,
  checkPos = null,
  flipped = false,
  showCoordinates = true,
  interactive = true,
}) => {
  const rows = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  const fileLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rankLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <div className="relative inline-block p-3 sm:p-4 bg-amber-900/40 rounded-3xl shadow-2xl border-4 border-amber-800/60 select-none">
      <div className="grid grid-cols-8 grid-rows-8 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] rounded-2xl overflow-hidden shadow-inner border-2 border-amber-950/40">
        {rows.map((r) =>
          cols.map((c) => {
            const isLight = (r + c) % 2 === 0;
            const isSelected = selectedPos?.row === r && selectedPos?.col === c;
            const isValidMove = validMoves.some((m) => m.row === r && m.col === c);
            const isCheckSquare = checkPos?.row === r && checkPos?.col === c;

            const content = board[r]?.[c];
            const hasPiece = !!content?.piece;
            const hasItem = !!content?.item;

            // Background colors (warm wood aesthetic)
            let bgClass = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
            if (isSelected) bgClass = 'bg-yellow-300';
            if (isCheckSquare) bgClass = 'bg-red-400 animate-pulse';

            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => interactive && onSquareClick(r, c)}
                className={`relative flex items-center justify-center p-0 m-0 cursor-pointer transition-colors duration-150 ${bgClass} ${
                  interactive ? 'hover:brightness-95 active:scale-95' : ''
                }`}
                style={{ outline: 'none' }}
              >
                {/* Coordinates */}
                {showCoordinates && c === (flipped ? 7 : 0) && (
                  <span
                    className={`absolute top-0.5 left-1 text-[10px] sm:text-xs font-bold pointer-events-none ${
                      isLight ? 'text-amber-800/70' : 'text-amber-100/70'
                    }`}
                  >
                    {rankLabels[r]}
                  </span>
                )}
                {showCoordinates && r === (flipped ? 0 : 7) && (
                  <span
                    className={`absolute bottom-0.5 right-1 text-[10px] sm:text-xs font-bold pointer-events-none ${
                      isLight ? 'text-amber-800/70' : 'text-amber-100/70'
                    }`}
                  >
                    {fileLabels[c]}
                  </span>
                )}

                {/* Move indicators */}
                {isValidMove && !hasPiece && !hasItem && (
                  <div className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-emerald-600/40 border-2 border-emerald-500/70 animate-pulse pointer-events-none" />
                )}

                {isValidMove && (hasPiece || hasItem) && (
                  <div className="absolute inset-1 rounded-xl border-4 border-rose-500/80 bg-rose-500/20 animate-pulse pointer-events-none" />
                )}

                {/* Content: Piece or Item */}
                {hasPiece && (
                  <ChessPiece
                    type={content!.piece!.type}
                    color={content!.piece!.color}
                    size={46}
                    className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                )}

                {hasItem && (
                  <ItemPiece
                    item={content!.item!}
                    size={42}
                  />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
