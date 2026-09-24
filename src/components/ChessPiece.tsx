import React from 'react';
import { PieceType, PieceColor, SpecialItem } from '../types/chess';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
  size?: number;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  className = '',
  size = 56,
}) => {
  const isWhite = color === 'w';
  const fill = isWhite ? '#FFFFFF' : '#2D3748';
  const stroke = isWhite ? '#4A5568' : '#1A202C';
  const accent = isWhite ? '#CBD5E0' : '#4A5568';
  const detail = isWhite ? '#E2E8F0' : '#1A202C';

  switch (type) {
    case 'p': // Peón
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          {/* Base */}
          <ellipse cx="50" cy="85" rx="30" ry="10" fill={fill} stroke={stroke} strokeWidth="4" />
          <path d="M26 85 C26 72 38 65 42 50 C44 42 43 38 38 35 C38 35 62 35 62 35 C57 38 56 42 58 50 C62 65 74 72 74 85 Z" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Head */}
          <circle cx="50" cy="28" r="18" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Eyes & Smile */}
          <circle cx="44" cy="26" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <circle cx="56" cy="26" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <path d="M45 32 Q50 36 55 32" stroke={isWhite ? '#2D3748' : '#FFFFFF'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Little Shield Accent on belly */}
          <path d="M44 55 Q50 62 56 55 Q50 50 44 55" fill={isWhite ? '#60A5FA' : '#F59E0B'} />
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
          {/* Base */}
          <ellipse cx="50" cy="86" rx="32" ry="9" fill={fill} stroke={stroke} strokeWidth="4" />
          <rect x="25" y="44" width="50" height="40" rx="4" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Castle Battlements */}
          <path d="M20 44 L20 22 L32 22 L32 30 L44 30 L44 22 L56 22 L56 30 L68 30 L68 22 L80 22 L80 44 Z" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Cute Castle Door and Window Eyes */}
          <rect x="36" y="34" width="7" height="7" rx="2" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <rect x="57" y="34" width="7" height="7" rx="2" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          {/* Smiling door */}
          <path d="M40 84 L40 64 Q50 58 60 64 L60 84 Z" fill={accent} stroke={stroke} strokeWidth="3" />
        </svg>
      );

    case 'n': // Caballo
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`filter drop-shadow-md transition-transform duration-150 ${className}`}
        >
          <ellipse cx="50" cy="86" rx="30" ry="9" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Horse body & head */}
          <path
            d="M28 86 C28 72 32 62 38 52 C35 48 30 45 28 38 C26 31 30 25 38 22 C42 16 48 14 55 15 C58 12 65 14 68 18 C78 22 82 32 80 42 C78 48 72 52 68 56 C68 68 72 76 72 86 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="4"
          />
          {/* Mane */}
          <path d="M68 20 C72 26 72 36 68 44" stroke={accent} strokeWidth="5" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="44" cy="30" r="3.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <circle cx="43" cy="29" r="1.2" fill="#FFFFFF" />
          {/* Muzzle & nostril */}
          <circle cx="32" cy="36" r="2" fill={stroke} />
          {/* Smile */}
          <path d="M34 40 Q40 43 45 39" stroke={isWhite ? '#2D3748' : '#FFFFFF'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
          <ellipse cx="50" cy="86" rx="30" ry="9" fill={fill} stroke={stroke} strokeWidth="4" />
          <path d="M26 86 C26 74 36 68 40 54 C42 46 40 40 36 36 C36 36 64 36 64 36 C60 40 58 46 60 54 C64 68 74 74 74 86 Z" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Mitre head with slice */}
          <ellipse cx="50" cy="34" rx="20" ry="24" fill={fill} stroke={stroke} strokeWidth="4" />
          <circle cx="50" cy="10" r="6" fill={fill} stroke={stroke} strokeWidth="3" />
          {/* Diagonal cut slit */}
          <line x1="42" y1="24" x2="62" y2="40" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          {/* Friendly eyes */}
          <circle cx="43" cy="38" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <circle cx="57" cy="38" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <path d="M46 44 Q50 48 54 44" stroke={isWhite ? '#2D3748' : '#FFFFFF'} strokeWidth="2" fill="none" strokeLinecap="round" />
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
          <ellipse cx="50" cy="86" rx="34" ry="9" fill={fill} stroke={stroke} strokeWidth="4" />
          <path d="M24 86 C26 70 34 62 38 48 C36 42 32 38 22 44 L28 26 L40 38 L50 20 L60 38 L72 26 L78 44 C68 38 64 42 62 48 C66 62 74 70 76 86 Z" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Jewels on crown points */}
          <circle cx="28" cy="24" r="4.5" fill="#EF4444" />
          <circle cx="50" cy="18" r="5" fill="#3B82F6" />
          <circle cx="72" cy="24" r="4.5" fill="#10B981" />
          {/* Friendly eyes and smile */}
          <circle cx="43" cy="56" r="3" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <circle cx="57" cy="56" r="3" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <path d="M45 64 Q50 69 55 64" stroke={isWhite ? '#2D3748' : '#FFFFFF'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
          <ellipse cx="50" cy="86" rx="34" ry="9" fill={fill} stroke={stroke} strokeWidth="4" />
          <path d="M26 86 C28 72 36 64 38 52 C38 44 34 40 30 38 L70 38 C66 40 62 44 62 52 C64 64 72 72 74 86 Z" fill={fill} stroke={stroke} strokeWidth="4" />
          {/* Royal Crown */}
          <path d="M28 38 C28 26 40 22 50 25 C60 22 72 26 72 38 Z" fill={accent} stroke={stroke} strokeWidth="4" />
          {/* Royal Cross */}
          <path d="M50 10 L50 24 M43 17 L57 17" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          {/* Friendly king eyes & grand moustache */}
          <circle cx="43" cy="54" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          <circle cx="57" cy="54" r="2.5" fill={isWhite ? '#2D3748' : '#FFFFFF'} />
          {/* Moustache */}
          <path d="M38 65 Q45 61 50 66 Q55 61 62 65" stroke={detail} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};

interface ItemPieceProps {
  item: SpecialItem;
  size?: number;
}

export const ItemPiece: React.FC<ItemPieceProps> = ({ item, size = 48 }) => {
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
