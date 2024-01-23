import usePlayer from "./usePlayer";
import useBall from "./useBall";
import { useGameContext } from "../context";
import useCollision from "./useCollision";
import useBlocks from "./useBlocks";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../context/constants";

interface UseGameInitialization {
  draw: (context: CanvasRenderingContext2D) => void;
  score: number;
  gameOver: boolean;
}

const useGameInitialization = (): UseGameInitialization => {
  const { showRectangles, generateBlocks } = useBlocks();

  const { drawPlayer } = usePlayer();

  const { drawBall, moveBall } = useBall();

  const {
    detectCanvasBoundaryCollision,
    detectPlayerCollision,
    detectBlockCollision,
  } = useCollision();

  const {
    state: { context, gameActive, gameOver, score },
    dispatch,
  } = useGameContext();

  const draw = () => {
    if (gameOver || !context.fillStyle) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    showRectangles();

    drawPlayer();

    drawBall();

    if (!gameActive) return;

    detectPlayerCollision();

    detectCanvasBoundaryCollision();

    detectBlockCollision();

    moveBall();
  };

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space") {
      if (gameOver) {
        dispatch({ type: "RESTART_GAME" });
        return generateBlocks();
      }

      dispatch({ type: "SET_GAME_ACTIVE" });
    }
  };

  requestAnimationFrame(draw);

  return { draw, score, gameOver };
};

export default useGameInitialization;
