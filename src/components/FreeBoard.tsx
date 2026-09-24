import React, { useState } from 'react';
import { BoardState, Position, PieceType, PieceColor, SpecialItem } from '../types/chess';
import { ChessBoard } from './ChessBoard';
import { createEmptyBoard, getValidMoves } from '../utils/chessRules';
import { sound } from '../utils/sound';
import { ChessPiece, ItemPiece } from './ChessPiece';
import { Trash2, Play } from 'lucide-react';

type PaletteSelection =
  | { kind: 'piece'; type: PieceType; color: PieceColor }
  | { kind: 'item'; item: SpecialItem }
  | { kind: 'eraser' }
  | null;

export const FreeBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [selectedPalette, setSelectedPalette] = useState<PaletteSelection>(null);
  const [selectedBoardPos, setSelectedBoardPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  const handlePaletteSelect = (item: PaletteSelection) => {
    setSelectedPalette(item);
    setSelectedBoardPos(null);
    setValidMoves([]);
  };

  const handleSquareClick = (r: number, c: number) => {
    // If an item/piece from palette is selected, place it
    if (selectedPalette) {
      const newBoard = board.map((row) => [...row]);
      if (selectedPalette.kind === 'eraser') {
        newBoard[r][c] = null;
        sound.playMove();
      } else if (selectedPalette.kind === 'piece') {
        newBoard[r][c] = { piece: { type: selectedPalette.type, color: selectedPalette.color } };
        sound.playMove();
      } else if (selectedPalette.kind === 'item') {
        newBoard[r][c] = { item: selectedPalette.item };
        sound.playStar();
      }
      setBoard(newBoard);
      return;
    }

    // Normal piece moving in free mode
    const content = board[r][c];

    if (content?.piece && !selectedBoardPos) {
      setSelectedBoardPos({ row: r, col: c });
      const moves = getValidMoves(r, c, board, { allowItemCollection: true });
      setValidMoves(moves);
      sound.playMove();
      return;
    }

    if (selectedBoardPos) {
      const newBoard = board.map((row) => [...row]);
      const moving = newBoard[selectedBoardPos.row][selectedBoardPos.col];

      if (r === selectedBoardPos.row && c === selectedBoardPos.col) {
        // Deselect
        setSelectedBoardPos(null);
        setValidMoves([]);
        return;
      }

      // Move piece freely to target square
      const hadItem = !!newBoard[r][c]?.item;
      const hadPiece = !!newBoard[r][c]?.piece;

      newBoard[selectedBoardPos.row][selectedBoardPos.col] = null;
      newBoard[r][c] = moving;

      if (hadItem) {
        sound.playCapture();
        sound.playStar();
      } else if (hadPiece) {
        sound.playCapture();
      } else {
        sound.playMove();
      }

      setBoard(newBoard);
      setSelectedBoardPos(null);
      setValidMoves([]);
    }
  };

  const setInitialBoard = () => {
    const newBoard = createEmptyBoard();
    const backRow: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

    // Black pieces
    backRow.forEach((type, c) => {
      newBoard[0][c] = { piece: { type, color: 'b' } };
      newBoard[1][c] = { piece: { type: 'p', color: 'b' } };
    });

    // White pieces
    backRow.forEach((type, c) => {
      newBoard[7][c] = { piece: { type, color: 'w' } };
      newBoard[6][c] = { piece: { type: 'p', color: 'w' } };
    });

    setBoard(newBoard);
    setSelectedBoardPos(null);
    setValidMoves([]);
    sound.playMove();
  };

  const clearBoard = () => {
    setBoard(createEmptyBoard());
    setSelectedBoardPos(null);
    setValidMoves([]);
    sound.playMove();
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2">
      {/* Title & Instructions */}
      <div className="w-full bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            👨‍👧‍👦 Tablero Libre para Papá
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Tocá una pieza o galletita de la barra y colocala en el casillero que quieras para armar el desafío.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={setInitialBoard}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition"
          >
            Tablero Completo
          </button>
          <button
            onClick={clearBoard}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl transition"
          >
            <Trash2 className="w-4 h-4" /> Limpiar
          </button>
        </div>
      </div>

      {/* Palette Toolbar */}
      <div className="w-full bg-white/95 rounded-2xl p-3 shadow-md border border-slate-200 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {/* White pieces */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl">
          {(['k', 'q', 'r', 'b', 'n', 'p'] as PieceType[]).map((type) => {
            const isSel = selectedPalette?.kind === 'piece' && selectedPalette.type === type && selectedPalette.color === 'w';
            return (
              <button
                key={`w-${type}`}
                onClick={() => handlePaletteSelect({ kind: 'piece', type, color: 'w' })}
                className={`p-1 rounded-lg transition ${isSel ? 'bg-amber-400 shadow-md ring-2 ring-amber-500' : 'hover:bg-white'}`}
                title={`Pieza blanca ${type}`}
              >
                <ChessPiece type={type} color="w" size={32} />
              </button>
            );
          })}
        </div>

        {/* Black pieces */}
        <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-xl">
          {(['k', 'q', 'r', 'b', 'n', 'p'] as PieceType[]).map((type) => {
            const isSel = selectedPalette?.kind === 'piece' && selectedPalette.type === type && selectedPalette.color === 'b';
            return (
              <button
                key={`b-${type}`}
                onClick={() => handlePaletteSelect({ kind: 'piece', type, color: 'b' })}
                className={`p-1 rounded-lg transition ${isSel ? 'bg-amber-400 shadow-md ring-2 ring-amber-500' : 'hover:bg-slate-700'}`}
                title={`Pieza negra ${type}`}
              >
                <ChessPiece type={type} color="b" size={32} />
              </button>
            );
          })}
        </div>

        {/* Fun items: cookie, star, apple, fence */}
        <div className="flex items-center gap-1 bg-amber-50 p-1.5 rounded-xl border border-amber-200">
          {(['cookie', 'star', 'apple', 'fence'] as SpecialItem[]).map((item) => {
            const isSel = selectedPalette?.kind === 'item' && selectedPalette.item === item;
            return (
              <button
                key={item}
                onClick={() => handlePaletteSelect({ kind: 'item', item })}
                className={`p-1 rounded-lg transition ${isSel ? 'bg-amber-400 shadow-md ring-2 ring-amber-500' : 'hover:bg-white'}`}
                title={`Premio ${item}`}
              >
                <ItemPiece item={item} size={28} />
              </button>
            );
          })}
        </div>

        {/* Tools: Eraser & Move Mode */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePaletteSelect({ kind: 'eraser' })}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
              selectedPalette?.kind === 'eraser'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <Trash2 className="w-4 h-4" /> Borrar
          </button>
          <button
            onClick={() => handlePaletteSelect(null)}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
              selectedPalette === null
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Play className="w-4 h-4" /> Jugar / Mover
          </button>
        </div>
      </div>

      {/* Chessboard */}
      <div className="relative">
        <ChessBoard
          board={board}
          selectedPos={selectedBoardPos}
          validMoves={validMoves}
          onSquareClick={handleSquareClick}
        />
      </div>
    </div>
  );
};
