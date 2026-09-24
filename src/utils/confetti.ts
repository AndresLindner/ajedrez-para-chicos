import confetti from 'canvas-confetti';

export const triggerVictoryConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerStarBurst = (xPercent = 0.5, yPercent = 0.5) => {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { x: xPercent, y: yPercent },
    colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'],
    scalar: 1.1
  });
};
