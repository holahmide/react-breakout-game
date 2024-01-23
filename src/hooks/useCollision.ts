import { useGameContext } from "../context";
import {
  BLOCK_HEIGHT,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../context/constants";
import { Block } from "./useBlocks";

const boundaryOffset = 10;

interface UseCollision {
  detectCanvasBoundaryCollision: () => void;
  detectPlayerCollision: () => void;
  detectBlockCollision: () => void;
}

const useCollision = (): UseCollision => {
  const {
    state: { availableBlocks, ball, player },
    dispatch,
  } = useGameContext();

  const detectCollision = (objectA: Block, objectB: Block) => {
    return (
      objectB.y <= Number(objectA.y + objectA.height) &&
      objectB.y + objectB.height >= objectA.y &&
      objectB.x <= objectA.x + objectA.width &&
      objectB.x + objectB.width >= objectA.x
    );
  };

  const detectCanvasBoundaryCollision = () => {
    if (ball.y + ball.dy < 0 + boundaryOffset) {
      dispatch({
        type: "UPDATE_BALL",
        payload: { dy: -ball.dy },
      });
    }
    if (
      ball.x + ball.dx > CANVAS_WIDTH - boundaryOffset ||
      ball.x + ball.dx < 0 + boundaryOffset
    ) {
      dispatch({
        type: "UPDATE_BALL",
        payload: { dx: -ball.dx },
      });
    }
    if (ball.y + ball.dy > CANVAS_HEIGHT - boundaryOffset) {
      dispatch({ type: "SET_GAME_OVER" });
    }
  };

  const detectPlayerCollision = () => {
    if (detectCollision(ball, player) && ball.dy > 0) {
      dispatch({
        type: "UPDATE_BALL",
        payload: { dy: -ball.dy },
      });
    }
  };

  const detectBlockCollision = () => {
    const currentY = ball.y;
    const currentDy = ball.dy;

    const findRectangle = availableBlocks.findIndex((block) => {
      if (
        detectCollision(ball, block) &&
        block.y + BLOCK_HEIGHT >= currentY &&
        currentDy < 0
      ) {
        return true;
      }
    });

    if (findRectangle > -1) {
      availableBlocks.splice(findRectangle, 1);
      dispatch({
        type: "SET_BLOCKS",
        payload: availableBlocks,
      });
      dispatch({
        type: "UPDATE_BALL",
        payload: { dy: -ball.dy },
      });
      dispatch({
        type: "INCREASE_SCORE",
      });
    }
  };

  return {
    detectCanvasBoundaryCollision,
    detectPlayerCollision,
    detectBlockCollision,
  };
};

export default useCollision;
