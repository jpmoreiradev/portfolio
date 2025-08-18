import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tileSize = 20;
  const canvasSize = { width: 1200, height: 720 };

  const [snake, setSnake] = useState<Position[]>([{ x: 8, y: 8 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });

  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Gerar comida
  const spawnFood = (snakeBody: Position[]) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (canvasSize.width / tileSize)),
        y: Math.floor(Math.random() * (canvasSize.height / tileSize)),
      };
    } while (
      snakeBody.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
    );
    setFood(newFood);
  };

  // Loop principal
  useEffect(() => {
    let animationFrame: number;
    let lastUpdate = performance.now();
    const speed = 80; // ms por movimento

    const loop = (time: number) => {
      animationFrame = requestAnimationFrame(loop);
      if (paused || gameOver) return;

      if (time - lastUpdate > speed) {
        lastUpdate = time;
        setDirection(nextDirection);

        setSnake((prev) => {
          const head = {
            x: prev[0].x + nextDirection.x,
            y: prev[0].y + nextDirection.y,
          };

          // Colisão com parede
          if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= canvasSize.width / tileSize ||
            head.y >= canvasSize.height / tileSize
          ) {
            setGameOver(true);
            return prev;
          }

          // Colisão consigo mesma
          if (prev.some((seg) => seg.x === head.x && seg.y === head.y)) {
            setGameOver(true);
            return prev;
          }

          const newSnake = [head, ...prev];

          // Comer comida
          if (head.x === food.x && head.y === food.y) {
            setScore((s) => s + 1);
            spawnFood(newSnake);
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      }
    };

    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [paused, nextDirection, gameOver, food]);

  // Input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      let newDir: Position | null = null;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          newDir = { x: 0, y: -1 };
          break;
        case 'arrowdown':
        case 's':
          newDir = { x: 0, y: 1 };
          break;
        case 'arrowleft':
        case 'a':
          newDir = { x: -1, y: 0 };
          break;
        case 'arrowright':
        case 'd':
          newDir = { x: 1, y: 0 };
          break;
        case ' ':
          if (!gameOver) setPaused((p) => !p); // Pausa só se não tiver Game Over
          break;
        case 'enter':
          if (gameOver) resetGame();
          break;
      }

      if (newDir) {
        if (snake.length > 1) {
          const [head, neck] = snake;
          if (head.x + newDir.x === neck.x && head.y + newDir.y === neck.y)
            return;
        }
        setNextDirection(newDir);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [snake, gameOver]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fundo
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // Cobra
    ctx.fillStyle = 'lime';
    snake.forEach((seg) =>
      ctx.fillRect(seg.x * tileSize, seg.y * tileSize, tileSize, tileSize),
    );

    // Pausa/GameOver
    if (paused) {
      ctx.fillStyle = 'yellow';
      ctx.font = '30px Arial';
      ctx.fillText('PAUSED', canvasSize.width / 2 - 60, canvasSize.height / 2);
    }

    if (gameOver) {
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(
        'Game Over! Press Enter',
        canvasSize.width / 2 - 140,
        canvasSize.height / 2,
      );
    }
  }, [snake, food, paused, gameOver]);

  const resetGame = () => {
    setSnake([{ x: 8, y: 8 }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setFood({ x: 10, y: 10 });
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black min-h-screen">
      <h1 className="text-xl font-bold text-white">🐍 Snake Game</h1>
      <p className="text-white font-bold text-lg">Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border-2 border-gray-500 rounded bg-black"
      />

      {/* Controles em linha */}
      <div className="mt-2 text-white text-center">
        <span className="mr-4">
          {' '}
          ⬆️ ⬇️ ⬅️ ➡️ / W A S D {'=>'} mover a cobra
        </span>
        <span className="mr-4">Espaço {'=>'} Pausar / Retomar</span>
      </div>
    </div>
  );
};

export default SnakeGame;
