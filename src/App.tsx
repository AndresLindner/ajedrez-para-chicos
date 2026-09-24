import React, { useState } from 'react';
import { AppMode } from './types/chess';
import { OriMode } from './components/OriMode';
import { EmilyMode } from './components/EmilyMode';
import { FreeBoard } from './components/FreeBoard';
import { GuideModal } from './components/GuideModal';
import { sound } from './utils/sound';
import { Volume2, VolumeX, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('ori');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) sound.playMove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 text-slate-800 flex flex-col font-kids">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 px-3 py-2.5 sm:px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Logo / Title */}
          <div className="flex items-center gap-2.5">
            <span className="text-3xl filter drop-shadow">♟️</span>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-amber-900 tracking-tight leading-tight">
                Ajedrez para los Chicos
              </h1>
              <p className="text-[11px] sm:text-xs text-amber-700 font-bold hidden sm:block">
                Emily (5.5) y Ori (4.2) • Aprendiendo con Papá
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-100/80 p-1 rounded-2xl border border-amber-200 shadow-inner">
            <button
              onClick={() => { setMode('ori'); sound.playMove(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                mode === 'ori'
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              <span>👦</span> Modo Ori <span className="text-[10px] opacity-80 hidden md:inline">(4 años)</span>
            </button>

            <button
              onClick={() => { setMode('emily'); sound.playMove(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                mode === 'emily'
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-purple-950 hover:bg-white/60'
              }`}
            >
              <span>👧</span> Modo Emily <span className="text-[10px] opacity-80 hidden md:inline">(5.5 años)</span>
            </button>

            <button
              onClick={() => { setMode('free'); sound.playMove(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                mode === 'free'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-indigo-950 hover:bg-white/60'
              }`}
            >
              <span>👨‍👧‍👦</span> Tablero Libre
            </button>
          </div>

          {/* Right Action Tools: Guide & Sound */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition"
              title="Guía para Papá"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">Guía para Papá</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition shadow-sm ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-6xl w-full mx-auto">
        {mode === 'ori' && <OriMode />}
        {mode === 'emily' && <EmilyMode />}
        {mode === 'free' && <FreeBoard />}
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-xs text-amber-800/70 border-t border-amber-200/60 font-medium">
        ♟️ Diseñado con cariño para aprender jugando en familia • ¡Que se diviertan!
      </footer>

      {/* Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default App;
