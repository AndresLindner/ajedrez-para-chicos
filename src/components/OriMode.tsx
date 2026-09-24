import React, { useState, useEffect } from 'react';
import { BoardState, Position, OriGame } from '../types/chess';
import { ChessBoard } from './ChessBoard';
import { createEmptyBoard, getValidMoves } from '../utils/chessRules';
import { sound } from '../utils/sound';
import { triggerVictoryConfetti, triggerStarBurst } from '../utils/confetti';
import { Trophy, RotateCcw, ChevronRight } from 'lucide-react';

export const OriMode: React.FC = () => {
  const [activeGame, setActiveGame] = useState<OriGame>('tower');
  const [level, setLevel] = useState<number>(1);
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [storyText, setStoryText] = useState<string>('');

  // Initialize selected game and level
  useEffect(() => {
    setupGame(activeGame, level);
  }, [activeGame, level]);

  const setupGame = (game: OriGame, lvl: number) => {
    const newBoard = createEmptyBoard();
    setIsWon(false);
    setSelectedPos(null);
    setValidMoves([]);

    if (game === 'tower') {
      // Torre Comegalletitas
      newBoard[4][4] = { piece: { type: 'r', color: 'w' } };
      let cookieCoords: [number, number][] = [];
      if (lvl === 1) {
        cookieCoords = [[4, 1], [4, 7], [1, 4]];
        setStoryText('¡Movete en línea recta con la Torre para comer las galletitas!');
      } else if (lvl === 2) {
        cookieCoords = [[4, 2], [1, 2], [1, 6], [6, 6]];
        setStoryText('¡Ahora la Torre tiene que doblar en cruz para atrapar todas!');
      } else {
        cookieCoords = [[0, 4], [0, 1], [6, 1], [6, 7], [2, 7]];
        setStoryText('¡El gran banquete de galletitas de la Torre!');
      }
      cookieCoords.forEach(([r, c]) => {
        newBoard[r][c] = { item: 'cookie' };
      });
      setItemsLeft(cookieCoords.length);
      setTotalItems(cookieCoords.length);
    } else if (game === 'bishop') {
      // Alfil Patinador (casilleros blancos: (r+c) % 2 === 0)
      newBoard[6][2] = { piece: { type: 'b', color: 'w' } };
      let starCoords: [number, number][] = [];
      if (lvl === 1) {
        starCoords = [[4, 4], [2, 6], [1, 7]];
        setStoryText('¡El Alfil patina por las diagonales blancas! Recolectá las estrellas.');
      } else if (lvl === 2) {
        starCoords = [[3, 5], [1, 3], [4, 0], [7, 3]];
        setStoryText('¡Patina en diagonal y dobla hacia el otro lado para atraparlas todas!');
      } else {
        starCoords = [[5, 1], [2, 4], [4, 6], [7, 3], [0, 6]];
        setStoryText('¡Pista mágica de patinaje del Alfil!');
      }
      starCoords.forEach(([r, c]) => {
        newBoard[r][c] = { item: 'star' };
      });
      setItemsLeft(starCoords.length);
      setTotalItems(starCoords.length);
    } else if (game === 'queen') {
      // Reina / Dama (Recto + Diagonal)
      newBoard[4][4] = { piece: { type: 'q', color: 'w' } };
      let jewelCoords: [number, number][] = [];
      if (lvl === 1) {
        // Orthogonal + Diagonal mix
        jewelCoords = [[1, 4], [4, 7], [1, 1], [7, 7]];
        setStoryText('¡La Reina combina la Torre y el Alfil! Puede moverse recto y en diagonal.');
      } else if (lvl === 2) {
        jewelCoords = [[4, 1], [1, 4], [1, 7], [6, 2], [6, 6]];
        setStoryText('¡Atrapá las joyas mágicas combinando líneas rectas y diagonales!');
      } else {
        jewelCoords = [[0, 4], [2, 6], [2, 1], [7, 1], [7, 7], [4, 0]];
        setStoryText('¡El gran vuelo de la Reina por todo el tablero!');
      }
      jewelCoords.forEach(([r, c]) => {
        newBoard[r][c] = { item: 'jewel' };
      });
      setItemsLeft(jewelCoords.length);
      setTotalItems(jewelCoords.length);
    } else if (game === 'king') {
      // Rey (1 paso a la vez en cualquier dirección)
      let itemCoords: [number, number][] = [];
      if (lvl === 1) {
        newBoard[4][4] = { piece: { type: 'k', color: 'w' } };
        // 3 items exactly 1 step away (straight and diagonal)
        itemCoords = [[3, 4], [4, 5], [5, 3]];
        setStoryText('¡El Rey camina hacia cualquier lado, pero solo de a un pasito por turno!');
      } else if (lvl === 2) {
        newBoard[5][5] = { piece: { type: 'k', color: 'w' } };
        // Items 2 steps away
        itemCoords = [[3, 5], [5, 2], [2, 2]];
        setStoryText('¡Paso a paso! Caminá de a un casillero por vez para buscar cada manzana.');
      } else {
        newBoard[6][6] = { piece: { type: 'k', color: 'w' } };
        // Path with a fence obstacle to reach the apples
        newBoard[5][5] = { item: 'fence' };
        newBoard[5][6] = { item: 'fence' };
        newBoard[4][6] = { item: 'fence' };
        itemCoords = [[6, 4], [4, 4], [2, 4], [2, 2]];
        setStoryText('¡El Rey camina con paciencia alrededor de las vallas hacia la meta!');
      }
      itemCoords.forEach(([r, c]) => {
        newBoard[r][c] = { item: 'apple' };
      });
      setItemsLeft(itemCoords.length);
      setTotalItems(itemCoords.length);
    } else if (game === 'knight') {
      // Caballo Saltarín
      newBoard[7][1] = { piece: { type: 'n', color: 'w' } };
      if (lvl === 1) {
        // Fence wall at row 6, apple at row 5
        newBoard[6][0] = { item: 'fence' };
        newBoard[6][1] = { item: 'fence' };
        newBoard[6][2] = { item: 'fence' };
        newBoard[5][2] = { item: 'apple' };
        setStoryText('¡Paso, paso y doblo! El Caballo salta por arriba de las vallas hacia la manzana.');
        setItemsLeft(1);
        setTotalItems(1);
      } else if (lvl === 2) {
        newBoard[6][1] = { item: 'fence' };
        newBoard[6][2] = { item: 'fence' };
        newBoard[5][0] = { item: 'apple' };
        newBoard[3][3] = { item: 'apple' };
        setStoryText('¡Saltá el paredón y atrapá las dos manzanas!');
        setItemsLeft(2);
        setTotalItems(2);
      } else {
        newBoard[6][0] = { item: 'fence' };
        newBoard[6][1] = { item: 'fence' };
        newBoard[5][2] = { item: 'fence' };
        newBoard[4][1] = { item: 'apple' };
        newBoard[2][2] = { item: 'apple' };
        newBoard[1][4] = { item: 'apple' };
        setStoryText('¡Gran pista de obstáculos del Caballo Saltarín!');
        setItemsLeft(3);
        setTotalItems(3);
      }
    } else if (game === 'mini-pawn') {
      // Mini Guerra de Peones (3 vs 3)
      setTurn('w');
      [2, 3, 4].forEach((c) => {
        newBoard[6][c] = { piece: { type: 'p', color: 'w' } };
        newBoard[1][c] = { piece: { type: 'p', color: 'b' } };
      });
      setStoryText('¡Mini Guerra de Peones! Avanzan de frente y comen en diagonal.');
      setItemsLeft(0);
      setTotalItems(0);
    }

    setBoard(newBoard);
  };

  const handleSquareClick = (r: number, c: number) => {
    if (isWon) return;

    // Mini Guerra de Peones logic
    if (activeGame === 'mini-pawn') {
      handlePawnWarClick(r, c);
      return;
    }

    // Single piece games (Tower, Bishop, Knight)
    const content = board[r][c];

    if (content?.piece?.color === 'w') {
      setSelectedPos({ row: r, col: c });
      const moves = getValidMoves(r, c, board, { allowItemCollection: true });
      setValidMoves(moves);
      sound.playMove();
      return;
    }

    // If a piece was selected and user clicks on a valid move
    if (selectedPos) {
      const isMoveValid = validMoves.some((m) => m.row === r && m.col === c);
      if (isMoveValid) {
        const newBoard = board.map((row) => [...row]);
        const movingPiece = newBoard[selectedPos.row][selectedPos.col]!.piece!;
        const targetSquare = newBoard[r][c];

        newBoard[selectedPos.row][selectedPos.col] = null;
        newBoard[r][c] = { piece: movingPiece };

        let updatedItemsLeft = itemsLeft;
        if (targetSquare?.item) {
          updatedItemsLeft -= 1;
          setItemsLeft(updatedItemsLeft);
          sound.playCapture();
          sound.playStar();
          triggerStarBurst(0.5, 0.4);
        } else {
          if (activeGame === 'knight') {
            sound.playBoing();
          } else {
            sound.playMove();
          }
        }

        setBoard(newBoard);
        setSelectedPos(null);
        setValidMoves([]);

        if (updatedItemsLeft === 0) {
          setIsWon(true);
          sound.playVictory();
          triggerVictoryConfetti();
        }
      } else {
        setSelectedPos(null);
        setValidMoves([]);
      }
    }
  };

  // Mini Guerra de Peones Turn Handling
  const handlePawnWarClick = (r: number, c: number) => {
    const content = board[r][c];

    // Selecting a piece
    if (content?.piece?.color === turn) {
      setSelectedPos({ row: r, col: c });
      const moves = getValidMoves(r, c, board, { allowItemCollection: false });
      setValidMoves(moves);
      sound.playMove();
      return;
    }

    // Moving selected piece
    if (selectedPos) {
      const isValid = validMoves.some((m) => m.row === r && m.col === c);
      if (isValid) {
        const newBoard = board.map((row) => [...row]);
        const movingPawn = newBoard[selectedPos.row][selectedPos.col]!.piece!;
        const isCapture = !!newBoard[r][c]?.piece;

        newBoard[selectedPos.row][selectedPos.col] = null;
        newBoard[r][c] = { piece: movingPawn };

        if (isCapture) {
          sound.playCapture();
        } else {
          sound.playMove();
        }

        // Check if pawn reached the opposite end (coronation & victory!)
        if (r === 0 && turn === 'w') {
          // White pawn crowned!
          newBoard[r][c] = { piece: { type: 'q', color: 'w' } };
          setBoard(newBoard);
          setIsWon(true);
          sound.playVictory();
          triggerVictoryConfetti();
          setStoryText('¡Bravo! ¡El peoncito llegó al final y se coronó Reina!');
          setSelectedPos(null);
          setValidMoves([]);
          return;
        }

        setBoard(newBoard);
        setSelectedPos(null);
        setValidMoves([]);

        // Next turn
        const nextTurn = turn === 'w' ? 'b' : 'w';
        setTurn(nextTurn);

        // Simple friendly AI response if Black's turn
        if (nextTurn === 'b') {
          setTimeout(() => {
            makeAiPawnMove(newBoard);
          }, 600);
        }
      } else {
        setSelectedPos(null);
        setValidMoves([]);
      }
    }
  };

  // Simple friendly bot for Black pawns
  const makeAiPawnMove = (curBoard: BoardState) => {
    const blackPieces: Position[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (curBoard[r][c]?.piece?.color === 'b') {
          blackPieces.push({ row: r, col: c });
        }
      }
    }

    // Find all valid moves for black pawns
    const possibleMoves: { from: Position; to: Position; isCapture: boolean }[] = [];
    blackPieces.forEach((p) => {
      const moves = getValidMoves(p.row, p.col, curBoard, { allowItemCollection: false });
      moves.forEach((m) => {
        const isCapture = !!curBoard[m.row][m.col]?.piece;
        possibleMoves.push({ from: p, to: m, isCapture });
      });
    });

    if (possibleMoves.length === 0) {
      // Black has no moves, White wins
      setIsWon(true);
      sound.playVictory();
      triggerVictoryConfetti();
      setStoryText('¡Excelente! ¡Los peones rivales quedaron trabados!');
      return;
    }

    // Prioritize capturing if possible
    const captureMove = possibleMoves.find((m) => m.isCapture);
    const chosenMove = captureMove || possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    const newBoard = curBoard.map((row) => [...row]);
    const pawn = newBoard[chosenMove.from.row][chosenMove.from.col]!.piece!;
    newBoard[chosenMove.from.row][chosenMove.from.col] = null;
    newBoard[chosenMove.to.row][chosenMove.to.col] = { piece: pawn };

    if (chosenMove.isCapture) {
      sound.playCapture();
    } else {
      sound.playMove();
    }

    // Did black reach the other side?
    if (chosenMove.to.row === 7) {
      newBoard[chosenMove.to.row][chosenMove.to.col] = { piece: { type: 'q', color: 'b' } };
      setBoard(newBoard);
      setStoryText('¡Casi! La máquina coronó primero. ¡Intentémoslo de nuevo!');
      setTurn('w');
      return;
    }

    setBoard(newBoard);
    setTurn('w');
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2">
      {/* Game Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => { setActiveGame('tower'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'tower'
              ? 'bg-amber-500 text-white scale-105 ring-4 ring-amber-300'
              : 'bg-white text-slate-700 hover:bg-amber-100'
          }`}
        >
          🏰 La Torre
        </button>
        <button
          onClick={() => { setActiveGame('bishop'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'bishop'
              ? 'bg-indigo-500 text-white scale-105 ring-4 ring-indigo-300'
              : 'bg-white text-slate-700 hover:bg-indigo-100'
          }`}
        >
          🧙 El Alfil
        </button>
        <button
          onClick={() => { setActiveGame('queen'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'queen'
              ? 'bg-purple-600 text-white scale-105 ring-4 ring-purple-300'
              : 'bg-white text-slate-700 hover:bg-purple-100'
          }`}
        >
          👑 La Reina
        </button>
        <button
          onClick={() => { setActiveGame('king'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'king'
              ? 'bg-amber-600 text-white scale-105 ring-4 ring-amber-300'
              : 'bg-white text-slate-700 hover:bg-amber-100'
          }`}
        >
          🤴 El Rey
        </button>
        <button
          onClick={() => { setActiveGame('knight'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'knight'
              ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-300'
              : 'bg-white text-slate-700 hover:bg-emerald-100'
          }`}
        >
          🐴 El Caballo
        </button>
        <button
          onClick={() => { setActiveGame('mini-pawn'); setLevel(1); }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
            activeGame === 'mini-pawn'
              ? 'bg-rose-500 text-white scale-105 ring-4 ring-rose-300'
              : 'bg-white text-slate-700 hover:bg-rose-100'
          }`}
        >
          🛡️ Guerra de Peones
        </button>
      </div>

      {/* Level & Mission Banner */}
      <div className="w-full bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
            {activeGame === 'tower' && '🍪'}
            {activeGame === 'bishop' && '⭐'}
            {activeGame === 'queen' && '💎'}
            {activeGame === 'king' && '👑'}
            {activeGame === 'knight' && '🍎'}
            {activeGame === 'mini-pawn' && '⚔️'}
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-800">{storyText}</p>
            {activeGame !== 'mini-pawn' ? (
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Galletitas / Premios restantes: <span className="font-bold text-amber-600">{itemsLeft} de {totalItems}</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Turno: <span className="font-bold text-rose-600">{turn === 'w' ? 'Blancas (Ori)' : 'Negras (Compu)'}</span>
              </p>
            )}
          </div>
        </div>

        {/* Level Controls */}
        {activeGame !== 'mini-pawn' && (
          <div className="flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-xl border border-amber-200">
            <span className="text-xs font-bold text-amber-900 px-2">Nivel:</span>
            {[1, 2, 3].map((lvlNum) => (
              <button
                key={lvlNum}
                onClick={() => setLevel(lvlNum)}
                className={`w-8 h-8 rounded-lg font-bold text-sm transition-all ${
                  level === lvlNum
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-amber-100'
                }`}
              >
                {lvlNum}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setupGame(activeGame, level)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
        >
          <RotateCcw className="w-4 h-4" /> Reiniciar
        </button>
      </div>

      {/* Interactive Chess Board */}
      <div className="relative">
        <ChessBoard
          board={board}
          selectedPos={selectedPos}
          validMoves={validMoves}
          onSquareClick={handleSquareClick}
        />

        {/* Victory Overlay Modal */}
        {isWon && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white z-20 animate-fade-in">
            <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">¡Muy bien Ori! 🎉</h3>
            <p className="text-sm sm:text-base font-medium mt-1 text-slate-100 max-w-xs">
              ¡Completaste el juego como un verdadero campeón del ajedrez!
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setupGame(activeGame, level)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition"
              >
                <RotateCcw className="w-4 h-4" /> Jugar otra vez
              </button>
              {level < 3 && activeGame !== 'mini-pawn' && (
                <button
                  onClick={() => setLevel((prev) => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-xl font-extrabold text-sm shadow-lg transition"
                >
                  Siguiente Nivel <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
