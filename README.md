# ♟️ Ajedrez para los Chicos: Emily & Ori

Una aplicación web interactiva desarrollada para aprender a jugar al ajedrez en familia, pensada especialmente para las edades y etapas de desarrollo de **Emily (5 años y medio)** y **Ori (4 años y 2 meses)**.

---

## 🚀 Cómo iniciar la aplicación

La aplicación ya está compilada y corriendo localmente en:
👉 **[http://localhost:5173](http://localhost:5173)**

Para abrirla desde el iPad o cualquier dispositivo en la misma red Wi-Fi:
👉 **`http://192.168.1.163:5173`**

Para iniciarla en cualquier momento desde tu terminal:
```bash
npm run dev
```

---

## ✨ Características y Módulos

### 👦 1. Modo Ori (4 años y 2 meses)
1. **🏰 La Torre:** 3 niveles interactivos para aprender el movimiento en cruz recto (`+`) recolectando galletitas.
2. **🧙 El Alfil:** Recolección de estrellas deslizándose únicamente por las diagonales sobre casilleros blancos (`X`).
3. **👑 La Reina:** Aprende a volar por todo el tablero combinando recto y diagonal para atrapar gemas mágicas.
4. **🤴 El Rey:** Practica caminar con calma hacia cualquier casillero, pero estrictamente de a 1 pasito a la vez.
5. **🐴 El Caballo:** Salta cercas y muros con sonido de salto para atrapar manzanas (el ritmo de *"paso, paso y doblo"*).
6. **🛡️ Guerra de 3 Peones:** Partidas cortitas y dinámicas con 3 peones blancos vs 3 peones negros contra una computadora amigable.

### 👧 2. Modo Emily (5 años y medio)
1. **⚔️ La Gran Guerra de 8 Peones:** Fila completa de 8 peones con avance de impulso, capturas diagonales y coronación a Reina (vs Compu o Pass-and-Play con Papá).
2. **🛡️ Salvá al Rey (Regla C-P-E):** Ejercicios donde el Rey blanco está en Jaque y Emily aprende a salvarlo con los botones interactivos:
   * **C - Comer:** Capturar a la pieza atacante.
   * **P - Proteger:** Colocar una pieza propia para bloquear el jaque.
   * **E - Escapar:** Huir con el Rey a un casillero seguro.
3. **👑 Jaque Mate en 1 Jugada:** Puzzles clásicos infantiles (el mate del pasillo y el beso de la Reina).
4. **🪜 El Mate de la Escalera:** El célebre mate de dos torres (o Reina y Torre) arrinconando al rey fila por fila hasta el borde.
5. **🍴 El Tenedor (Ataque Doble):** Tenedores reales de caballo, peón y dama atacando dos piezas rivales al mismo tiempo.
6. **🎯 ¿Quién la Cuida? (Piezas Sueltas):** Identificar piezas rivales que quedaron desprotegidas para capturarlas gratis.

### 👨‍👧‍👦 3. Tablero Libre (Para Papá)
* Un lienzo libre donde podés colocar cualquier pieza (blancas, negras, galletitas, estrellas, manzanas o vallas).
* Mover piezas libremente o armar desafíos a medida en vivo desde la tablet o notebook al lado del tablero físico.

### 📖 4. Guía Pedagógica Integrada
* Botón en la barra superior con el manual de historias, reglas infantiles y consejos de juego en castellano natural de Buenos Aires.

### 🔊 Efectos de Sonido y Festejos
* Sonidos amigables y fanfarrias generados en tiempo real con Web Audio API (desbloqueados para Safari iOS).
* Animaciones de confeti y lluvia de estrellas con cada victoria.
