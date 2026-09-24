import React from 'react';
import { PieceType, PieceColor, SpecialItem } from '../types/chess';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
  size?: number | string;
}

/**
 * Professional Staunton Chess Pieces (Tournament Standard)
 * Clean, authentic, non-cartoon shapes as used in international tournament play.
 */
export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  className = '',
  size = '84%',
}) => {
  const isWhite = color === 'w';

  // Palette:
  // White: Pure white body, deep graphite border (#1e293b)
  // Black: Professional deep charcoal (#1e293b) body, crisp white internal accent lines
  const whiteFill = '#FFFFFF';
  const blackFill = '#1E293B';
  const strokeColor = '#111827';
  const whiteLine = '#FFFFFF';

  switch (type) {
    case 'p': // Peón (Pawn)
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <path
            d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
            fill={whiteFill}
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <path
            d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
            fill={blackFill}
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'r': // Torre (Rook)
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 9,39 h 27 v -3 h -27 z" fill={whiteFill} />
            <path d="m 12,36 v -4 h 21 v 4 z" fill={whiteFill} />
            <path d="m 11,14 h 23 v -5 h -4 v 2 h -5 v -2 h -5 v 2 h -4 v -2 h -5 z" fill={whiteFill} />
            <path d="m 12,14 1.5,18 h 16 l 1.5,-18 z" fill={whiteFill} />
            <path d="m 14,29.5 h 17" />
            <path d="m 14,16.5 h 17" />
            <path d="m 11,14 h 23" />
          </g>
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 9,39 h 27 v -3 h -27 z" fill={blackFill} />
            <path d="m 12,36 v -4 h 21 v 4 z" fill={blackFill} />
            <path d="m 11,14 h 23 v -5 h -4 v 2 h -5 v -2 h -5 v 2 h -4 v -2 h -5 z" fill={blackFill} />
            <path d="m 12,14 1.5,18 h 16 l 1.5,-18 z" fill={blackFill} />
            <path d="m 14,29.5 h 17" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 14,16.5 h 17" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 11,14 h 23" stroke={whiteLine} strokeWidth="1.3" />
          </g>
        </svg>
      );

    case 'n': // Caballo (Knight) - Real Professional Staunton Shape
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21"
              fill={whiteFill}
            />
            <path
              d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-3.04 0,-3 -1,0 0.19,1.23 -1,2 -1,0 -4.003,1 -4,-4 0,-2 6,-12 6,-12 0,0 1.89,-1.9 2,-3.5 -0.73,-0.994 -0.5,-2 -0.5,-3 1,-1 3,2.5 3,2.5 l 2,0 c 0,0 0.78,-1.992 2.5,-3 1,0 1,3 1,3"
              fill={whiteFill}
            />
            <circle cx="9.5" cy="25.5" r="0.8" fill={strokeColor} />
            <path
              d="m 15,15.5 c 0,1.38 -0.45,2.5 -1,2.5 -0.55,0 -1,-1.12 -1,-2.5 0,-1.38 0.45,-2.5 1,-2.5 0.55,0 1,1.12 1,2.5 z"
              transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
              fill={strokeColor}
            />
          </g>
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21"
              fill={blackFill}
            />
            <path
              d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-3.04 0,-3 -1,0 0.19,1.23 -1,2 -1,0 -4.003,1 -4,-4 0,-2 6,-12 6,-12 0,0 1.89,-1.9 2,-3.5 -0.73,-0.994 -0.5,-2 -0.5,-3 1,-1 3,2.5 3,2.5 l 2,0 c 0,0 0.78,-1.992 2.5,-3 1,0 1,3 1,3"
              fill={blackFill}
            />
            <circle cx="9.5" cy="25.5" r="0.8" fill={whiteLine} />
            <path
              d="m 15,15.5 c 0,1.38 -0.45,2.5 -1,2.5 -0.55,0 -1,-1.12 -1,-2.5 0,-1.38 0.45,-2.5 1,-2.5 0.55,0 1,1.12 1,2.5 z"
              transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
              fill={whiteLine}
            />
            {/* Real Staunton mane cuts */}
            <path d="m 24.55,10.4 c -0.45,1.45 -1.2,2.3 -2.8,2.6" stroke={whiteLine} strokeWidth="1.2" />
            <path d="m 26.2,14.7 c -0.3,1.3 -0.8,2.1 -2.1,2.4" stroke={whiteLine} strokeWidth="1.2" />
            <path d="m 27.7,19.2 c -0.3,1.3 -0.8,2.1 -2.1,2.4" stroke={whiteLine} strokeWidth="1.2" />
            <path d="m 29.2,23.7 c -0.3,1.3 -0.8,2.1 -2.1,2.4" stroke={whiteLine} strokeWidth="1.2" />
          </g>
        </svg>
      );

    case 'b': // Alfil (Bishop)
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,0.5 -3.39,-0.97 -10.11,0.46 -13.5,-1 -3.39,1.46 -10.11,0.03 -13.5,1 -1.354,0.49 -2.323,0.47 -3,-0.5 1.354,-1.94 3,-2 3,-2 z"
              fill={whiteFill}
              strokeLinecap="butt"
            />
            <path
              d="m 15,32 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z"
              fill={whiteFill}
            />
            <circle cx="22.5" cy="8" r="1.5" fill={whiteFill} />
            <path d="m 17.5,26 h 10" />
            <path d="m 15,30 h 15" />
            <path d="m 22.5,15.5 v 5" />
            <path d="m 20,18 h 5" />
          </g>
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,0.5 -3.39,-0.97 -10.11,0.46 -13.5,-1 -3.39,1.46 -10.11,0.03 -13.5,1 -1.354,0.49 -2.323,0.47 -3,-0.5 1.354,-1.94 3,-2 3,-2 z"
              fill={blackFill}
              strokeLinecap="butt"
            />
            <path
              d="m 15,32 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z"
              fill={blackFill}
            />
            <circle cx="22.5" cy="8" r="1.5" fill={blackFill} />
            <path d="m 17.5,26 h 10" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 15,30 h 15" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 22.5,15.5 v 5" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 20,18 h 5" stroke={whiteLine} strokeWidth="1.3" />
          </g>
        </svg>
      );

    case 'q': // Dama / Reina (Queen)
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 8,12 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={whiteFill} />
            <path d="m 24.5,9 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={whiteFill} />
            <path d="m 41,12 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={whiteFill} />
            <path d="m 16,14.5 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={whiteFill} />
            <path d="m 33,14.5 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={whiteFill} />
            <path
              d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 -4,-16 -4.5,16 -4.5,-16 -4,16 -7,-11 2,12 z"
              fill={whiteFill}
            />
            <path
              d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0.5,-2.5 0,0 0,-1.5 -1.5,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
              fill={whiteFill}
            />
            <path
              d="m 11,38.5 a 3.5,1.5 0 1 1 -7,0 3.5,1.5 0 1 1 7,0 z"
              fill={whiteFill}
              transform="translate(10,-0.5)"
            />
            <path d="m 12,32 c 2.5,1 18.5,1 21,0" />
            <path d="m 11,35 c 3.5,1 19.5,1 23,0" />
            <path d="m 9,38 c 4,1 23,1 27,0" />
          </g>
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 8,12 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={blackFill} />
            <path d="m 24.5,9 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={blackFill} />
            <path d="m 41,12 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={blackFill} />
            <path d="m 16,14.5 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={blackFill} />
            <path d="m 33,14.5 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z" fill={blackFill} />
            <path
              d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 -4,-16 -4.5,16 -4.5,-16 -4,16 -7,-11 2,12 z"
              fill={blackFill}
            />
            <path
              d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0.5,-2.5 0,0 0,-1.5 -1.5,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
              fill={blackFill}
            />
            <path
              d="m 11,38.5 a 3.5,1.5 0 1 1 -7,0 3.5,1.5 0 1 1 7,0 z"
              fill={blackFill}
              transform="translate(10,-0.5)"
            />
            <path d="m 12,32 c 2.5,1 18.5,1 21,0" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 11,35 c 3.5,1 19.5,1 23,0" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 9,38 c 4,1 23,1 27,0" stroke={whiteLine} strokeWidth="1.3" />
          </g>
        </svg>
      );

    case 'k': // Rey (King)
      return isWhite ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 22.5,11.63 v 6" />
            <path d="m 20,13.5 h 5" />
            <path
              d="m 22.5,25 c 0,-4.5 -4.5,-7 -4.5,-7 3,0 4.5,-2 4.5,-4 0,2 1.5,4 4.5,4 0,0 -4.5,2.5 -4.5,7 z"
              fill={whiteFill}
            />
            <path
              d="m 11.5,37 c 5.5,3.5 15.5,3.5 21,0 v -7 c 0,0 9,-4.5 6,-10.5 -4,-6.5 -13.5,-3.5 -16,4 v 3.5 0 -3.5 c -2.5,-7.5 -12,-10.5 -16,-4 -3,6 6,10.5 6,10.5 v 7 z"
              fill={whiteFill}
            />
            <path d="m 11.5,30 c 5.5,-2 15.5,-2 21,0" />
            <path d="m 11.5,33.5 c 5.5,-2 15.5,-2 21,0" />
            <path d="m 11.5,37 c 5.5,-2 15.5,-2 21,0" />
          </g>
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 45 45"
          className={`filter drop-shadow-sm transition-transform duration-100 ${className}`}
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={strokeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m 22.5,11.63 v 6" stroke={whiteLine} strokeWidth="1.5" />
            <path d="m 20,13.5 h 5" stroke={whiteLine} strokeWidth="1.5" />
            <path
              d="m 22.5,25 c 0,-4.5 -4.5,-7 -4.5,-7 3,0 4.5,-2 4.5,-4 0,2 1.5,4 4.5,4 0,0 -4.5,2.5 -4.5,7 z"
              fill={blackFill}
            />
            <path
              d="m 11.5,37 c 5.5,3.5 15.5,3.5 21,0 v -7 c 0,0 9,-4.5 6,-10.5 -4,-6.5 -13.5,-3.5 -16,4 v 3.5 0 -3.5 c -2.5,-7.5 -12,-10.5 -16,-4 -3,6 6,10.5 6,10.5 v 7 z"
              fill={blackFill}
            />
            <path d="m 11.5,30 c 5.5,-2 15.5,-2 21,0" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 11.5,33.5 c 5.5,-2 15.5,-2 21,0" stroke={whiteLine} strokeWidth="1.3" />
            <path d="m 11.5,37 c 5.5,-2 15.5,-2 21,0" stroke={whiteLine} strokeWidth="1.3" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};

interface ItemPieceProps {
  item: SpecialItem;
  size?: number | string;
}

export const ItemPiece: React.FC<ItemPieceProps> = ({ item, size = '78%' }) => {
  switch (item) {
    case 'cookie': // Galletita
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="animate-bounce-gentle filter drop-shadow">
          <circle cx="50" cy="50" r="40" fill="#D97706" stroke="#92400E" strokeWidth="4" />
          <circle cx="48" cy="48" r="36" fill="#FBBF24" />
          {/* Chocolate chips */}
          <circle cx="34" cy="38" r="6" fill="#78350F" />
          <circle cx="62" cy="34" r="5" fill="#78350F" />
          <circle cx="50" cy="52" r="6.5" fill="#78350F" />
          <circle cx="36" cy="64" r="5.5" fill="#78350F" />
          <circle cx="66" cy="62" r="5" fill="#78350F" />
        </svg>
      );

    case 'star': // Estrella brillante
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="animate-pulse-ring filter drop-shadow">
          <polygon
            points="50,8 62,38 95,38 68,58 78,88 50,70 22,88 32,58 5,38 38,38"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="4"
          />
        </svg>
      );

    case 'jewel': // Gema
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="filter drop-shadow animate-pulse-ring">
          <polygon points="50,15 80,38 70,80 30,80 20,38" fill="#A855F7" stroke="#7E22CE" strokeWidth="4" />
          <polygon points="50,22 72,40 64,74 36,74 28,40" fill="#C084FC" />
        </svg>
      );

    case 'apple': // Manzana
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="filter drop-shadow">
          <path d="M50 25 C45 15 55 10 58 12" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M56 16 C64 14 68 18 64 22 C60 22 56 18 56 16 Z" fill="#22C55E" />
          <circle cx="38" cy="54" r="26" fill="#EF4444" />
          <circle cx="62" cy="54" r="26" fill="#EF4444" />
        </svg>
      );

    case 'fence': // Valla / cerca
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="filter drop-shadow opacity-90">
          <rect x="18" y="25" width="12" height="60" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <polygon points="18,25 24,15 30,25" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <rect x="44" y="25" width="12" height="60" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <polygon points="44,25 50,15 56,25" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <rect x="70" y="25" width="12" height="60" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <polygon points="70,25 76,15 82,25" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <rect x="10" y="40" width="80" height="10" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <rect x="10" y="65" width="80" height="10" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="3" />
        </svg>
      );

    default:
      return null;
  }
};
