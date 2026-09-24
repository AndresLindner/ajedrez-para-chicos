import React from 'react';
import { PieceType, PieceColor, SpecialItem } from '../types/chess';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
  size?: number | string;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  className = '',
  size = '84%',
}) => {
  const isWhite = color === 'w';

  // Palette:
  // White piece: clean warm ivory/white body, subtle slate-gray shadow lines
  // Black piece: deep slate body, crisp light contour lines
  const fill = isWhite ? '#FFFFFF' : '#1E293B';
  const stroke = isWhite ? '#334155' : '#0F172A';
  const innerShadow = isWhite ? '#E2E8F0' : '#0F172A';
  const highlight = isWhite ? '#F8FAFC' : '#475569';
  const detail = isWhite ? '#64748B' : '#94A3B8';
  const eyePupil = isWhite ? '#1E293B' : '#FFFFFF';
  const eyeLight = '#FFFFFF';

  switch (type) {
    case 'p': // Peón
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 22 88 C 22 84 26 83 50 83 C 74 83 78 84 78 88 C 78 90 74 91 50 91 C 26 91 22 90 22 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 Base */}
          <path
            d="M 28 83 C 28 78 34 76 50 76 C 66 76 72 78 72 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Body waist */}
          <path
            d="M 32 76 C 36 60 40 50 42 43 L 58 43 C 60 50 64 60 68 76 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Collar ring */}
          <path
            d="M 36 43 C 36 39 42 38 50 38 C 58 38 64 39 64 43 C 64 45 58 46 50 46 C 42 46 36 45 36 43 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
          />
          {/* Head sphere */}
          <circle cx="50" cy="26" r="16" fill={fill} stroke={stroke} strokeWidth="3.5" />
          {/* Head highlight shine */}
          <ellipse cx="45" cy="20" rx="6" ry="3.5" transform="rotate(-30 45 20)" fill={highlight} />
          {/* Friendly face */}
          <circle cx="45" cy="25" r="2.2" fill={eyePupil} />
          <circle cx="55" cy="25" r="2.2" fill={eyePupil} />
          <path d="M 46 31 Q 50 35 54 31" stroke={detail} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'r': // Torre
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 20 88 C 20 84 25 83 50 83 C 75 83 80 84 80 88 C 80 91 75 92 50 92 C 25 92 20 91 20 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 plinth */}
          <path
            d="M 26 83 C 26 77 32 75 50 75 C 68 75 74 77 74 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tower body */}
          <path
            d="M 29 75 L 34 38 L 66 38 L 71 75 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tower top cornice */}
          <path
            d="M 26 38 L 26 32 L 74 32 L 74 38 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
          />
          {/* Battlements (3 distinct crenels) */}
          <path
            d="M 24 32 L 24 16 L 36 16 L 36 24 L 44 24 L 44 16 L 56 16 L 56 24 L 64 24 L 64 16 L 76 16 L 76 32 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Castle arched doorway */}
          <path
            d="M 43 75 L 43 56 C 43 50 57 50 57 56 L 57 75 Z"
            fill={isWhite ? '#CBD5E1' : '#0F172A'}
            stroke={stroke}
            strokeWidth="3"
          />
          {/* Castle windows (eyes) */}
          <rect x="38" y="42" width="5" height="7" rx="2.5" fill={isWhite ? '#334155' : '#FFFFFF'} />
          <rect x="57" y="42" width="5" height="7" rx="2.5" fill={isWhite ? '#334155' : '#FFFFFF'} />
        </svg>
      );

    case 'n': // Caballo (Knight) - Refined, proud, beautiful shape
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 20 88 C 20 84 25 83 50 83 C 75 83 80 84 80 88 C 80 91 75 92 50 92 C 25 92 20 91 20 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 Pedestal */}
          <path
            d="M 26 83 C 26 78 32 76 50 76 C 68 76 74 78 74 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Horse Main Silhouette */}
          <path
            d="M 30 76 
               C 34 68 38 60 44 54 
               C 42 49 39 46 32 44 
               C 27 42 23 39 21 34 
               C 20 29 23 25 28 24 
               C 33 24 38 27 44 26 
               C 46 22 47 17 48 13 
               C 49 10 52 10 53 14 
               L 54 18 
               C 56 12 59 12 60 15 
               L 60 21 
               C 66 23 74 30 76 40 
               C 77 47 76 55 75 62 
               C 74 69 72 73 70 76 
               Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Flowing Mane Strands on the back */}
          <path
            d="M 58 22 C 64 26 68 33 68 40"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 64 34 C 71 40 73 48 72 55"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 69 49 C 74 56 74 64 71 70"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Horse Muzzle, Nostril & Mouth */}
          <path
            d="M 23 32 Q 25 35 28 34"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Nostril dot */}
          <circle cx="25" cy="30" r="1.8" fill={stroke} />

          {/* Gentle, expressive Horse Eye */}
          <ellipse cx="41" cy="27" rx="4" ry="5.5" fill={eyePupil} />
          <circle cx="39.5" cy="25" r="1.8" fill={eyeLight} />

          {/* Cheek & Jaw muscle curve */}
          <path
            d="M 37 36 C 44 38 46 44 42 49"
            stroke={detail}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Chest contour */}
          <path
            d="M 46 56 C 40 64 36 71 34 76"
            stroke={detail}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'b': // Alfil
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 22 88 C 22 84 26 83 50 83 C 74 83 78 84 78 88 C 78 91 74 92 50 92 C 26 92 22 91 22 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 Pedestal */}
          <path
            d="M 28 83 C 28 78 34 76 50 76 C 66 76 72 78 72 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Stem / Waist */}
          <path
            d="M 34 76 C 37 64 42 56 42 48 L 58 48 C 58 56 63 64 66 76 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Collar ring */}
          <path
            d="M 36 48 C 36 44 42 43 50 43 C 58 43 64 44 64 48 C 64 51 58 52 50 52 C 42 52 36 51 36 48 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
          />
          {/* Mitre (Head) */}
          <path
            d="M 33 43 C 30 35 34 22 50 14 C 66 22 70 35 67 43 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Top pommel sphere */}
          <circle cx="50" cy="12" r="5" fill="#F59E0B" stroke={stroke} strokeWidth="3" />
          {/* Classic diagonal mitre cut/slit */}
          <path
            d="M 44 23 L 61 38"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Friendly eyes */}
          <circle cx="43" cy="33" r="2.2" fill={eyePupil} />
          <circle cx="57" cy="33" r="2.2" fill={eyePupil} />
          <path d="M 46 39 Q 50 43 54 39" stroke={detail} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'q': // Reina / Dama
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 20 88 C 20 84 25 83 50 83 C 75 83 80 84 80 88 C 80 91 75 92 50 92 C 25 92 20 91 20 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 Pedestal */}
          <path
            d="M 26 83 C 26 78 32 76 50 76 C 68 76 74 78 74 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Body waist */}
          <path
            d="M 30 76 C 34 60 41 52 42 42 L 58 42 C 59 52 66 60 70 76 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Collar ring */}
          <path
            d="M 34 42 C 34 38 41 37 50 37 C 59 37 66 38 66 42 C 66 44 59 45 50 45 C 41 45 34 44 34 42 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
          />
          {/* Radiant 5-point Crown */}
          <path
            d="M 23 37 L 21 19 L 36 29 L 50 14 L 64 29 L 79 19 L 77 37 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Crown Jewels (5 pearls) */}
          <circle cx="21" cy="18" r="4" fill="#EF4444" stroke={stroke} strokeWidth="2.5" />
          <circle cx="36" cy="28" r="3.5" fill="#3B82F6" stroke={stroke} strokeWidth="2.5" />
          <circle cx="50" cy="13" r="4.5" fill="#F59E0B" stroke={stroke} strokeWidth="2.5" />
          <circle cx="64" cy="28" r="3.5" fill="#10B981" stroke={stroke} strokeWidth="2.5" />
          <circle cx="79" cy="18" r="4" fill="#8B5CF6" stroke={stroke} strokeWidth="2.5" />
          {/* Friendly eyes and smile */}
          <circle cx="43" cy="52" r="2.5" fill={eyePupil} />
          <circle cx="57" cy="52" r="2.5" fill={eyePupil} />
          <path d="M 45 60 Q 50 65 55 60" stroke={detail} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'k': // Rey
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base bottom plinth */}
          <path
            d="M 20 88 C 20 84 25 83 50 83 C 75 83 80 84 80 88 C 80 91 75 92 50 92 C 25 92 20 91 20 88 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tier 2 Pedestal */}
          <path
            d="M 26 83 C 26 78 32 76 50 76 C 68 76 74 78 74 83 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Body waist */}
          <path
            d="M 29 76 C 33 60 40 52 42 40 L 58 40 C 60 52 67 60 71 76 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Royal Crown arches */}
          <path
            d="M 28 40 C 26 25 40 22 50 25 C 60 22 74 25 72 40 Z"
            fill={innerShadow}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Royal Cross Finial on top */}
          <path
            d="M 50 8 L 50 22 M 43 14 L 57 14"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Friendly king eyes & grand moustache */}
          <circle cx="43" cy="50" r="2.5" fill={eyePupil} />
          <circle cx="57" cy="50" r="2.5" fill={eyePupil} />
          <path
            d="M 37 60 Q 45 56 50 61 Q 55 56 63 60"
            stroke={detail}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
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
          <circle cx="44" cy="46" r="2.5" fill="#713F12" />
          <circle cx="56" cy="46" r="2.5" fill="#713F12" />
          <path d="M46 54 Q50 58 54 54" stroke="#713F12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
