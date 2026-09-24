import React, { useState } from 'react';
import { BookOpen, X, ChevronDown, ChevronUp, Star, Shield, Trophy } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('golden-rule');

  if (!isOpen) return null;

  const toggle = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">Guía Rápida para Papá</h2>
              <p className="text-xs text-amber-100 font-medium">Historias, trucos y metáforas para Emily y Ori</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 divide-y divide-amber-100 text-slate-800 text-sm">
          {/* Section 1: La Regla de Oro */}
          <div className="pt-2">
            <button
              onClick={() => toggle('golden-rule')}
              className="w-full flex items-center justify-between font-bold text-left text-base text-amber-900 py-2 hover:text-amber-700"
            >
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" /> 1. La Regla de Oro: Tablero Despejado
              </span>
              {openSection === 'golden-rule' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openSection === 'golden-rule' && (
              <div className="mt-2 text-slate-600 space-y-2 pl-7 pb-2 text-xs sm:text-sm">
                <p>
                  <strong>No pongas las 32 piezas de entrada:</strong> Para chicos de 4 y 5 años, un tablero lleno genera sobrecarga visual, se les caen las piezas y se desconcentran en 2 minutos.
                </p>
                <p>
                  Empezá siempre con <strong>minijuegos</strong> sobre el tablero vacío: solo la Torre comiendo galletitas, solo el Alfil patinando, o la Guerra de Peones.
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Historias de cada pieza */}
          <div className="pt-2">
            <button
              onClick={() => toggle('stories')}
              className="w-full flex items-center justify-between font-bold text-left text-base text-amber-900 py-2 hover:text-amber-700"
            >
              <span className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> 2. Las Historias de las Piezas
              </span>
              {openSection === 'stories' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openSection === 'stories' && (
              <div className="mt-2 text-slate-600 space-y-3 pl-7 pb-2 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-800">🏰 La Torre ("La Comegalletitas"):</h4>
                  <p>Líneas rectas (arriba, abajo, izquierda, derecha en forma de cruz <code>+</code>). Poné pedacitos de galletitas o cereales para que los recolecte.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">🧙 El Alfil ("El Patinador de Hielo"):</h4>
                  <p>Solo en diagonal (<code>X</code>). La regla: <em>«El que nació en casillero blanco patina sobre hielo blanco; ¡nunca puede pisar el casillero negro!»</em>.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">👑 La Reina / Dama ("La Superheroína"):</h4>
                  <p>Tiene los poderes de la Torre y del Alfil juntos: recto y diagonal a cualquier distancia.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">🛡️ Los Peones ("Los Soldaditos del Escudo"):</h4>
                  <p>
                    Avanzan 1 paso hacia adelante (o 2 en el arranque). <em>«Llevan un escudo grande de frente (por eso si chocan cara a cara quedan trabados), pero llevan una espada en cada mano a los costados, ¡así que comen en diagonal hacia adelante!»</em>.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">🐴 El Caballo ("El Saltarín"):</h4>
                  <p>Decimos: <em>«Paso, paso... ¡y doblo!»</em> (1, 2 y al costado). Es la <strong>única pieza</strong> que salta por arriba de otras piezas.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">🤴 El Rey ("El de la Corona Pesada"):</h4>
                  <p>Va hacia cualquier casillero vecino, pero de a un solo pasito porque la corona de oro le pesa mucho.</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Jaque y Jaque Mate */}
          <div className="pt-2">
            <button
              onClick={() => toggle('checkmate')}
              className="w-full flex items-center justify-between font-bold text-left text-base text-amber-900 py-2 hover:text-amber-700"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-500" /> 3. Jaque y la Regla C - P - E
              </span>
              {openSection === 'checkmate' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openSection === 'checkmate' && (
              <div className="mt-2 text-slate-600 space-y-2 pl-7 pb-2 text-xs sm:text-sm">
                <p>
                  <strong>¡Jaque!:</strong> Es el aviso de caballeros: <em>«Cuidado Rey, ojo que estás en peligro»</em>.
                </p>
                <p>
                  <strong>Salidas de emergencia (Regla C - P - E):</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>C - Comer:</strong> Comer la pieza que ataca al Rey.</li>
                  <li><strong>P - Proteger:</strong> Poner un escudo o pieza en el medio (tapar).</li>
                  <li><strong>E - Escapar:</strong> Huir con el Rey a un casillero seguro.</li>
                </ul>
                <p>
                  <strong>¡Jaque Mate!:</strong> Cuando el Rey está en jaque y <em>no puede Comer, Proteger ni Escapar</em>, quedó acorralado sin salida.
                </p>
              </div>
            )}
          </div>

          {/* Section 4: Emily vs Ori */}
          <div className="pt-2">
            <button
              onClick={() => toggle('profiles')}
              className="w-full flex items-center justify-between font-bold text-left text-base text-amber-900 py-2 hover:text-amber-700"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" /> 4. Emily (5.5) vs Ori (4.2): Consejos
              </span>
              {openSection === 'profiles' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openSection === 'profiles' && (
              <div className="mt-2 text-slate-600 space-y-2 pl-7 pb-2 text-xs sm:text-sm">
                <p>
                  <strong>Para Ori (4.2 años):</strong> Sesiones de 5 a 8 minutos. Festejale cada captura. Si juegan con reyes, <em>dejá que su objetivo sea comerse al Rey</em> (la regla de acorralar es abstracta a los 4 años y festejan más atraparlo).
                </p>
                <p>
                  <strong>Para Emily (5.5 años):</strong> Sesiones de 15 a 20 minutos. Ya puede jugar la Guerra de 8 Peones, pensar en quién cuida a sus piezas y salvar al Rey con la regla C-P-E.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-50 border-t border-amber-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition shadow"
          >
            ¡Entendido, a jugar!
          </button>
        </div>
      </div>
    </div>
  );
};
