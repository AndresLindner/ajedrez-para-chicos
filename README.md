# ♟️ Ajedrez para los Chicos: Emily & Ori

Una aplicación web interactiva desarrollada para aprender a jugar al ajedrez en familia, pensada especialmente para las edades y etapas de desarrollo de **Emily (5 años y medio)** y **Ori (4 años y 2 meses)**.

---

## 🚀 Cómo iniciar la aplicación

La aplicación ya está compilada y corriendo localmente en:
👉 **[http://localhost:5173](http://localhost:5173)**

Para abrirla o reiniciarla en cualquier momento desde tu terminal:
```bash
npm run dev
```

---

## ✨ Características y Módulos

### 👦 1. Modo Ori (4 años y 2 meses)
* **La Torre Comegalletitas:** 3 niveles interactivos para aprender el movimiento recto recolectando galletitas con sonido de mordisco.
* **El Alfil Patinador:** Recolección de estrellas deslizándose únicamente por las diagonales blancas.
* **El Salto del Caballo:** Salta cercas y muros con sonido de salto para atrapar manzanas rojas (aprende el "paso, paso y doblo").
* **Guerra de 3 Peones:** Partidas cortitas y dinámicas con 3 peones blancos vs 3 peones negros contra una computadora amigable.

### 👧 2. Modo Emily (5 años y medio)
* **La Gran Guerra de 8 Peones:** Los 8 peones completos. Permite jugar contra la máquina o "con Papá" en modo dos jugadores. Coronación automática a Reina al llegar a la última fila.
* **Salvá al Rey (Regla C-P-E):** Desafíos donde el Rey blanco está en peligro (Jaque) y Emily debe elegir la salida correcta:
  * **C - Comer:** Capturar la pieza que ataca.
  * **P - Proteger:** Colocar una pieza propia para bloquear el jaque.
  * **E - Escapar:** Huir con el Rey a un casillero seguro.
* **Jaque Mate en 1 Jugada:** Puzzles clásicos infantiles (el mate del pasillo y el beso de la Reina).

### 👨‍👧‍👦 3. Tablero Libre (Para Papá)
* Un lienzo libre donde podés colocar cualquier pieza (blancas, negras, galletitas, estrellas, manzanas o vallas).
* Mover piezas libremente o armar desafíos a medida en vivo desde la tablet o notebook al lado del tablero físico.

### 📖 4. Guía Pedagógica Integrada
* Botón en la barra superior con el manual de historias, reglas infantiles y consejos de juego en castellano natural de Buenos Aires.

### 🔊 Efectos de Sonido Sintetizados
* Sonidos amigables y fanfarrias generados en tiempo real con Web Audio API (no requiere descargar archivos de audio pesados).
* Animaciones de confeti y lluvia de estrellas con cada victoria.
