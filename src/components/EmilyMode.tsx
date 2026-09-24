import React, { useState, useEffect } from 'react';
import { BoardState, Position, EmilyGame } from '../types/chess';
import { ChessBoard } from './ChessBoard';
import { createEmptyBoard, getValidMoves, isKingInCheck, findKing } from '../utils/chessRules';
import { sound } from '../utils/sound';
import { triggerVictoryConfetti } from '../utils/confetti';
import { Trophy, RotateCcw, Shield, ChevronRight } from 'lucide-react';

export const EmilyMode: React.FC = () => {
  const [activeGame, setActiveGame] = useState<EmilyGame>('pawn-wars');
  const [level, setLevel] = useState<number>(1);
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [isWon, setIsWon] = useState<boolean>(false);
  const [cpeHint, setCpeHint] = useState<'C' | 'P' | 'E' | null>(null);
  const [storyText, setStoryText] = useState<string>('');
  const [vsMode, setVsMode] = useState<'ai' | 'pass'>('ai');

  useEffect(() => {
    setupGame(activeGame, level);
  }, [activeGame, level]);

  const setupGame = (game: EmilyGame, lvl: number) => {
    const newBoard = createEmptyBoard();
    setIsWon(false);
    setSelectedPos(null);
    setValidMoves([]);
    setCpeHint(null);
    setTurn('w');

    if (game === 'pawn-wars') {
      // 8 peones blancos vs 8 peones negros
      for (let c = 0; c < 8; c++) {
        newBoard[6][c] = { piece: { type: 'p', color: 'w' } };
        newBoard[1][c] = { piece: { type: 'p', color: 'b' } };
      }
      setStoryText('La Gran Guerra de Peones: avanzan de frente y comen en diagonal. ¡El primero en coronar Reina gana!');
    } else if (game === 'save-king') {
      // Salvá al Rey con la regla C-P-E
      sound.playCheck();
      if (lvl === 1) {
        // Solución: C - Comer la pieza que ataca
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        newBoard[5][2] = { piece: { type: 'b', color: 'w' } };
        newBoard[4][4] = { piece: { type: 'q', color: 'b' } };
        setStoryText('¡Cuidado! La Reina negra le da Jaque a tu Rey. ¿Podés COMER a la atacante con tu Alfil?');
      } else if (lvl === 2) {
        // Solución: P - Proteger / Poner escudo
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        newBoard[6][6] = { piece: { type: 'p', color: 'w' } };
        newBoard[6][7] = { piece: { type: 'p', color: 'w' } };
        newBoard[5][2] = { piece: { type: 'b', color: 'w' } };
        newBoard[7][0] = { piece: { type: 'r', color: 'b' } };
        setStoryText('¡Jaque de la Torre negra! No podemos comerla ni correr. ¿Podés PROTEGER poniendo un escudo?');
      } else {
        // Solución: E - Escapar con el Rey
        newBoard[4][4] = { piece: { type: 'k', color: 'w' } };
        newBoard[4][0] = { piece: { type: 'r', color: 'b' } };
        newBoard[2][2] = { piece: { type: 'p', color: 'w' } };
        setStoryText('¡Jaque en la fila! Nadie puede tapar ni comer a la Torre. ¿Hacia qué casillero seguro puede ESCAPAR el Rey?');
      }
    } else if (game === 'checkmate-1') {
      // Puzzles de Jaque Mate en 1 jugada
      if (lvl === 1) {
        // Mate del pasillo
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][5] = { piece: { type: 'p', color: 'b' } };
        newBoard[1][6] = { piece: { type: 'p', color: 'b' } };
        newBoard[1][7] = { piece: { type: 'p', color: 'b' } };
        newBoard[7][3] = { piece: { type: 'r', color: 'w' } };
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('El Mate del Pasillo: El Rey negro no puede saltar sus peones. ¡Llevá la Torre a la última fila para dar Jaque Mate!');
      } else if (lvl === 2) {
        // El beso de la muerte de la Reina
        newBoard[0][4] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][3] = { piece: { type: 'p', color: 'b' } };
        newBoard[1][4] = { piece: { type: 'p', color: 'b' } };
        newBoard[4][2] = { piece: { type: 'b', color: 'w' } };
        newBoard[3][7] = { piece: { type: 'q', color: 'w' } };
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('El Abrazo de la Reina: Tu Alfil cuida el casillero frente al Rey. ¡Colocá tu Reina ahí para dar Jaque Mate!');
      } else {
        newBoard[0][7] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][7] = { piece: { type: 'p', color: 'b' } };
        newBoard[2][6] = { piece: { type: 'q', color: 'w' } };
        newBoard[7][0] = { piece: { type: 'r', color: 'w' } };
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Acorralá al Rey rival! Buscá la jugada con tu Reina que deje al Rey en Jaque Mate.');
      }
    } else if (game === 'ladder-mate') {
      // El Mate de la Escalera (Lawnmower / Ladder Mate)
      if (lvl === 1) {
        // Nivel 1: El último escalón (Torres en b7 y h2, Rey en e8)
        newBoard[0][4] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][1] = { piece: { type: 'r', color: 'w' } }; // Torre en b7 corta fila 7
        newBoard[6][7] = { piece: { type: 'r', color: 'w' } }; // Torre en h2
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('El Mate de la Escalera: Una Torre ya corta la salida. ¡Llevá la otra Torre a la fila 8 para completar la escalera!');
      } else if (lvl === 2) {
        // Nivel 2: Dos Torres empujando al Rey
        newBoard[0][2] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][6] = { piece: { type: 'r', color: 'w' } }; // Torre en g7
        newBoard[5][0] = { piece: { type: 'r', color: 'w' } }; // Torre en a3
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Remate de la Escalera! Tu Torre de la izquierda debe subir a la última fila para dar Jaque Mate.');
      } else {
        // Nivel 3: Escalera de Dama y Torre
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[1][1] = { piece: { type: 'q', color: 'w' } }; // Reina en b7 cortando fila 7
        newBoard[6][0] = { piece: { type: 'r', color: 'w' } }; // Torre en a2
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('Escalera Real: La Dama corta el paso del Rey en la fila 7. ¡Subí la Torre a la fila 8 para dar Jaque Mate!');
      }
    } else if (game === 'forks') {
      // El Tenedor / Ataque Doble
      if (lvl === 1) {
        // Tenedor Real de Caballo (amenaza al Rey y a la Torre a la vez)
        newBoard[0][4] = { piece: { type: 'k', color: 'b' } }; // Rey en e8
        newBoard[0][0] = { piece: { type: 'r', color: 'b' } }; // Torre en a8
        newBoard[3][3] = { piece: { type: 'n', color: 'w' } }; // Caballo en d5
        newBoard[7][4] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡El Tenedor Real! Saltá con tu Caballo al casillero mágico donde amenaces al Rey y a la Torre al mismo tiempo.');
      } else if (lvl === 2) {
        // Tenedor de Peón (amenaza a dos piezas a la vez)
        newBoard[3][2] = { piece: { type: 'n', color: 'b' } }; // Caballo en c5
        newBoard[3][4] = { piece: { type: 'b', color: 'b' } }; // Alfil en e5
        newBoard[5][3] = { piece: { type: 'p', color: 'w' } }; // Peón en d3
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Tenedor de Peón! Avanzá tu peón al centro para amenazar con sus dos espadas diagonales al Caballo y al Alfil a la vez.');
      } else {
        // Tenedor / Doble amenaza de Dama
        newBoard[3][5] = { piece: { type: 'k', color: 'b' } }; // Rey en f5
        newBoard[3][1] = { piece: { type: 'r', color: 'b' } }; // Torre en b5
        newBoard[7][3] = { piece: { type: 'q', color: 'w' } }; // Dama en d1
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Ataque Doble de Dama! Colocá la Dama en el casillero donde le dé Jaque al Rey y a la vez apunte a la Torre.');
      }
    } else if (game === 'defenders') {
      // Piezas Desprotegidas (¿Quién la cuida?)
      if (lvl === 1) {
        // Torre negra en b7 defendida por peón en a6. Caballo negro en f6 desprotegido.
        newBoard[1][1] = { piece: { type: 'r', color: 'b' } };
        newBoard[2][0] = { piece: { type: 'p', color: 'b' } }; // cuida a b7
        newBoard[2][5] = { piece: { type: 'n', color: 'b' } }; // f6: ¡SOLO Y REGALADO!
        newBoard[4][3] = { piece: { type: 'q', color: 'w' } }; // Dama blanca en d4
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Cazando piezas sueltas! Una de las piezas negras no tiene amigos cuidándola. ¿Cuál es? ¡Comela con tu Dama!');
      } else if (lvl === 2) {
        // Alfil negro en c6 desprotegido. Torre en e8 cuidada por peón en d7.
        newBoard[2][2] = { piece: { type: 'b', color: 'b' } }; // c6: DESPROTEGIDO
        newBoard[0][4] = { piece: { type: 'r', color: 'b' } }; // e8
        newBoard[1][3] = { piece: { type: 'p', color: 'b' } }; // d7 cuida e8
        newBoard[7][2] = { piece: { type: 'r', color: 'w' } }; // Torre en c1
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡Atenta Emily! Hay un Alfil negro que quedó solito sin nadie que lo defienda. ¡Atrapalo con tu Torre!');
      } else {
        // Caballo en e4 desprotegido
        newBoard[4][4] = { piece: { type: 'n', color: 'b' } }; // e4 solo
        newBoard[5][3] = { piece: { type: 'p', color: 'w' } }; // Peón en d3
        newBoard[6][6] = { piece: { type: 'b', color: 'w' } }; // Alfil en g2
        newBoard[0][6] = { piece: { type: 'k', color: 'b' } };
        newBoard[7][6] = { piece: { type: 'k', color: 'w' } };
        setStoryText('¡El Caballo rival avanzó solo y nadie lo cuida! Capturalo de forma segura con tu peón o tu alfil.');
      }
    }

    setBoard(newBoard);
  };

  const handleSquareClick = (r: number, c: number) => {
    if (isWon) return;

    if (activeGame === 'pawn-wars') {
      handlePawnWarClick(r, c);
      return;
    }

    const content = board[r][c];

    // Selecting a white piece
    if (content?.piece?.color === 'w') {
      setSelectedPos({ row: r, col: c });
      const moves = getValidMoves(r, c, board, { allowItemCollection: false });
      setValidMoves(moves);
      sound.playMove();
      return;
    }

    // Moving white piece
    if (selectedPos) {
      const isValid = validMoves.some((m) => m.row === r && m.col === c);
      if (isValid) {
        const newBoard = board.map((row) => [...row]);
        const movingPiece = newBoard[selectedPos.row][selectedPos.col]!.piece!;
        const targetPiece = newBoard[r][c]?.piece;

        newBoard[selectedPos.row][selectedPos.col] = null;
        newBoard[r][c] = { piece: movingPiece };

        if (targetPiece) {
          sound.playCapture();
        } else {
          sound.playMove();
        }

        // Verify victory conditions for each puzzle mode
        if (activeGame === 'save-king') {
          const stillInCheck = isKingInCheck(newBoard, 'w');
          if (!stillInCheck) {
            setBoard(newBoard);
            setIsWon(true);
            sound.playVictory();
            triggerVictoryConfetti();
            setStoryText('¡Genial Emily! ¡Salvaste al Rey con la regla C-P-E!');
          } else {
            setBoard(newBoard);
            sound.playCheck();
            setStoryText('¡Cuidado! El Rey sigue en jaque. Intentá otra jugada.');
          }
        } else if (activeGame === 'checkmate-1') {
          let isCorrectMate = false;
          if (level === 1 && movingPiece.type === 'r' && r === 0) {
            isCorrectMate = true;
          } else if (level === 2 && movingPiece.type === 'q' && r === 1 && c === 5) {
            isCorrectMate = true;
          } else if (level === 3 && movingPiece.type === 'q' && ((r === 1 && c === 6) || (r === 0 && c === 6))) {
            isCorrectMate = true;
          }

          if (isCorrectMate) {
            setBoard(newBoard);
            setIsWon(true);
            sound.playVictory();
            triggerVictoryConfetti();
            setStoryText('¡JAQUE MATE! ¡Encerraste al Rey por completo!');
          } else {
            setBoard(newBoard);
            setStoryText('¡Buena jugada, pero el Rey todavía puede defenderse! Probá otra.');
          }
        } else if (activeGame === 'ladder-mate') {
          // El Mate de la Escalera
          let isLadderMate = false;
          if (level === 1 && movingPiece.type === 'r' && r === 0) {
            isLadderMate = true;
          } else if (level === 2 && movingPiece.type === 'r' && r === 0) {
            isLadderMate = true;
          } else if (level === 3 && movingPiece.type === 'r' && r === 0) {
            isLadderMate = true;
          }

          if (isLadderMate) {
            setBoard(newBoard);
            setIsWon(true);
            sound.playVictory();
            triggerVictoryConfetti();
            setStoryText('¡JAQUE MATE DE LA ESCALERA! ¡Las dos torres hicieron un trabajo perfecto!');
          } else {
            setBoard(newBoard);
            setStoryText('¡Casi! Recordá llevar la torre a la fila 8 para encerrar al Rey.');
          }
        } else if (activeGame === 'forks') {
          // El Tenedor
          let isCorrectFork = false;
          if (level === 1 && movingPiece.type === 'n' && r === 1 && c === 2) {
            // Caballo a c7 (jaque a e8 y amenaza a a8)
            isCorrectFork = true;
          } else if (level === 2 && movingPiece.type === 'p' && r === 4 && c === 3) {
            // Peón a d4 (amenaza a c5 y e5)
            isCorrectFork = true;
          } else if (level === 3 && movingPiece.type === 'q' && r === 3 && c === 3) {
            // Dama a d5 (jaque a f5 y amenaza a b5)
            isCorrectFork = true;
          }

          if (isCorrectFork) {
            setBoard(newBoard);
            setIsWon(true);
            sound.playVictory();
            triggerVictoryConfetti();
            setStoryText('¡TENEDOR PERFECTO! ¡Amenazaste dos piezas a la vez como una gran maestra!');
          } else {
            setBoard(newBoard);
            setStoryText('Buena jugada, pero buscá el casillero donde ataques las dos piezas rivales al mismo tiempo.');
          }
        } else if (activeGame === 'defenders') {
          // Cazando piezas sueltas
          let isCorrectCapture = false;
          if (level === 1 && r === 2 && c === 5) {
            // Comió el caballo suelto en f6
            isCorrectCapture = true;
          } else if (level === 2 && r === 2 && c === 2) {
            // Comió el alfil suelto en c6
            isCorrectCapture = true;
          } else if (level === 3 && r === 4 && c === 4) {
            // Comió el caballo suelto en e4
            isCorrectCapture = true;
          }

          if (isCorrectCapture) {
            setBoard(newBoard);
            setIsWon(true);
            sound.playVictory();
            triggerVictoryConfetti();
            setStoryText('¡PIEZA ATRAPADA! Identificaste la pieza que estaba sola y te la comiste gratis.');
          } else {
            setBoard(newBoard);
            setStoryText('¡Cuidado! Fijate bien cuál es la pieza negra que no tiene amigos defendiéndola.');
          }
        }

        setSelectedPos(null);
        setValidMoves([]);
      } else {
        setSelectedPos(null);
        setValidMoves([]);
      }
    }
  };

  // Full 8-pawn War logic
  const handlePawnWarClick = (r: number, c: number) => {
    const content = board[r][c];

    if (content?.piece?.color === turn) {
      setSelectedPos({ row: r, col: c });
      const moves = getValidMoves(r, c, board, { allowItemCollection: false });
      setValidMoves(moves);
      sound.playMove();
      return;
    }

    if (selectedPos) {
      const isValid = validMoves.some((m) => m.row === r && m.col === c);
      if (isValid) {
        const newBoard = board.map((row) => [...row]);
        const movingPawn = newBoard[selectedPos.row][selectedPos.col]!.piece!;
        const isCapture = !!newBoard[r][c]?.piece;

        newBoard[selectedPos.row][selectedPos.col] = null;
        newBoard[r][c] = { piece: movingPawn };

        if (isCapture) sound.playCapture();
        else sound.playMove();

        // Check White Coronation
        if (r === 0 && turn === 'w') {
          newBoard[r][c] = { piece: { type: 'q', color: 'w' } };
          setBoard(newBoard);
          setIsWon(true);
          sound.playVictory();
          triggerVictoryConfetti();
          setStoryText('¡Victoria para Emily! ¡El peoncito cruzó todo el tablero y es Reina!');
          setSelectedPos(null);
          setValidMoves([]);
          return;
        }

        // Check Black Coronation (if pass and play)
        if (r === 7 && turn === 'b') {
          newBoard[r][c] = { piece: { type: 'q', color: 'b' } };
          setBoard(newBoard);
          setIsWon(true);
          sound.playVictory();
          triggerVictoryConfetti();
          setStoryText('¡Las Negras coronaron Reina!');
          setSelectedPos(null);
          setValidMoves([]);
          return;
        }

        setBoard(newBoard);
        setSelectedPos(null);
        setValidMoves([]);

        const nextTurn = turn === 'w' ? 'b' : 'w';
        setTurn(nextTurn);

        if (nextTurn === 'b' && vsMode === 'ai') {
          setTimeout(() => {
            makeAiEmilyMove(newBoard);
          }, 600);
        }
      } else {
        setSelectedPos(null);
        setValidMoves([]);
      }
    }
  };

  const makeAiEmilyMove = (curBoard: BoardState) => {
    const blackPieces: Position[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (curBoard[r][c]?.piece?.color === 'b') {
          blackPieces.push({ row: r, col: c });
        }
      }
    }

    const possibleMoves: { from: Position; to: Position; isCapture: boolean; score: number }[] = [];
    blackPieces.forEach((p) => {
      const moves = getValidMoves(p.row, p.col, curBoard, { allowItemCollection: false });
      moves.forEach((m) => {
        const isCapture = !!curBoard[m.row][m.col]?.piece;
        let score = m.row * 2;
        if (isCapture) score += 10;
        if (m.row === 7) score += 50;
        possibleMoves.push({ from: p, to: m, isCapture, score });
      });
    });

    if (possibleMoves.length === 0) {
      setIsWon(true);
      sound.playVictory();
      triggerVictoryConfetti();
      setStoryText('¡Los peones negros no tienen jugadas legales! ¡Gana Emily!');
      return;
    }

    possibleMoves.sort((a, b) => b.score - a.score);
    const chosen = possibleMoves[0];

    const newBoard = curBoard.map((row) => [...row]);
    const pawn = newBoard[chosen.from.row][chosen.from.col]!.piece!;
    newBoard[chosen.from.row][chosen.from.col] = null;
    newBoard[chosen.to.row][chosen.to.col] = { piece: pawn };

    if (chosen.isCapture) sound.playCapture();
    else sound.playMove();

    if (chosen.to.row === 7) {
      newBoard[chosen.to.row][chosen.to.col] = { piece: { type: 'q', color: 'b' } };
      setBoard(newBoard);
      setStoryText('La máquina logró coronar. ¡Vamos a jugar la revancha!');
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
          onClick={() => { setActiveGame('pawn-wars'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'pawn-wars'
              ? 'bg-rose-500 text-white scale-105 ring-4 ring-rose-300'
              : 'bg-white text-slate-700 hover:bg-rose-100'
          }`}
        >
          ⚔️ Guerra de 8 Peones
        </button>
        <button
          onClick={() => { setActiveGame('save-king'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'save-king'
              ? 'bg-amber-600 text-white scale-105 ring-4 ring-amber-300'
              : 'bg-white text-slate-700 hover:bg-amber-100'
          }`}
        >
          🛡️ Salvá al Rey (C-P-E)
        </button>
        <button
          onClick={() => { setActiveGame('checkmate-1'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'checkmate-1'
              ? 'bg-purple-600 text-white scale-105 ring-4 ring-purple-300'
              : 'bg-white text-slate-700 hover:bg-purple-100'
          }`}
        >
          👑 Jaque Mate en 1
        </button>
        <button
          onClick={() => { setActiveGame('ladder-mate'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'ladder-mate'
              ? 'bg-blue-600 text-white scale-105 ring-4 ring-blue-300'
              : 'bg-white text-slate-700 hover:bg-blue-100'
          }`}
        >
          🪜 Mate de la Escalera
        </button>
        <button
          onClick={() => { setActiveGame('forks'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'forks'
              ? 'bg-emerald-600 text-white scale-105 ring-4 ring-emerald-300'
              : 'bg-white text-slate-700 hover:bg-emerald-100'
          }`}
        >
          🍴 El Tenedor Doble
        </button>
        <button
          onClick={() => { setActiveGame('defenders'); setLevel(1); }}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            activeGame === 'defenders'
              ? 'bg-teal-600 text-white scale-105 ring-4 ring-teal-300'
              : 'bg-white text-slate-700 hover:bg-teal-100'
          }`}
        >
          🎯 ¿Quién la Cuida?
        </button>
      </div>

      {/* Mission Banner */}
      <div className="w-full bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl shadow-inner">
            {activeGame === 'pawn-wars' && '⚔️'}
            {activeGame === 'save-king' && '🛡️'}
            {activeGame === 'checkmate-1' && '👑'}
            {activeGame === 'ladder-mate' && '🪜'}
            {activeGame === 'forks' && '🍴'}
            {activeGame === 'defenders' && '🎯'}
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-800">{storyText}</p>
            {activeGame === 'pawn-wars' && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Turno: <span className="font-bold text-rose-600">{turn === 'w' ? 'Blancas (Emily)' : 'Negras'}</span>
              </p>
            )}
          </div>
        </div>

        {/* Level Controls & Opponent Mode */}
        <div className="flex items-center gap-2">
          {activeGame === 'pawn-wars' ? (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setVsMode('ai')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  vsMode === 'ai' ? 'bg-white text-rose-600 shadow' : 'text-slate-600'
                }`}
              >
                vs Compu
              </button>
              <button
                onClick={() => setVsMode('pass')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  vsMode === 'pass' ? 'bg-white text-rose-600 shadow' : 'text-slate-600'
                }`}
              >
                con Papá
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-purple-50 p-1.5 rounded-xl border border-purple-200">
              <span className="text-xs font-bold text-purple-900 px-1">Desafío:</span>
              {[1, 2, 3].map((lvlNum) => (
                <button
                  key={lvlNum}
                  onClick={() => setLevel(lvlNum)}
                  className={`w-8 h-8 rounded-lg font-bold text-sm transition-all ${
                    level === lvlNum
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-purple-100'
                  }`}
                >
                  {lvlNum}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setupGame(activeGame, level)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" /> Reiniciar
          </button>
        </div>
      </div>

      {/* C-P-E Interactive Helper Toolbar (Only shown in Save King game) */}
      {activeGame === 'save-king' && (
        <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-700" />
            <span className="text-xs sm:text-sm font-bold text-amber-900">Salidas de Emergencia C - P - E:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCpeHint('C')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition shadow-sm ${
                cpeHint === 'C' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              C - Comer
            </button>
            <button
              onClick={() => setCpeHint('P')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition shadow-sm ${
                cpeHint === 'P' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-blue-50'
              }`}
            >
              P - Proteger
            </button>
            <button
              onClick={() => setCpeHint('E')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition shadow-sm ${
                cpeHint === 'E' ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 hover:bg-purple-50'
              }`}
            >
              E - Escapar
            </button>
          </div>
          {cpeHint && (
            <p className="w-full text-xs text-amber-800 font-medium mt-1">
              {cpeHint === 'C' && '💡 C - Comer: ¿Podés capturar la pieza que amenaza al Rey con alguna de tus piezas?'}
              {cpeHint === 'P' && '💡 P - Proteger: ¿Podés meter un peón, alfil o caballo en el camino para tapar el jaque?'}
              {cpeHint === 'E' && '💡 E - Escapar: Movete a un casillero vecino donde ninguna pieza enemiga te amenace.'}
            </p>
          )}
        </div>
      )}

      {/* Interactive Chessboard */}
      <div className="relative">
        <ChessBoard
          board={board}
          selectedPos={selectedPos}
          validMoves={validMoves}
          onSquareClick={handleSquareClick}
          checkPos={activeGame === 'save-king' ? findKing(board, 'w') : null}
        />

        {/* Victory Modal */}
        {isWon && (
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white z-20 animate-fade-in">
            <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">¡Brillante Emily! 🎉</h3>
            <p className="text-sm sm:text-base font-medium mt-1 text-slate-100 max-w-xs">
              ¡Jugada maestra! Pensaste cada movimiento como una verdadera estratega.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setupGame(activeGame, level)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition"
              >
                <RotateCcw className="w-4 h-4" /> Jugar de nuevo
              </button>
              {level < 3 && activeGame !== 'pawn-wars' && (
                <button
                  onClick={() => setLevel((prev) => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-xl font-extrabold text-sm shadow-lg transition"
                >
                  Siguiente Desafío <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
