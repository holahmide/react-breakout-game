import { useGameContext } from "../context";
import { CANVAS_WIDTH } from "../context/constants";

export interface Player {
  width: number;
  height: number;
  x: number;
  y: number;
  dx: number;
}

interface UsePlayer {
  player: Player;
  drawPlayer: () => void;
}

enum DIRECTONS {
  Left = "LEFT",
  Right = "RIGHT",
}

const PLAYER_COLOR = "white";
const KEY_LEFT_CODE = 37;
const KEY_RIGHT_CODE = 39;

const usePlayer = (): UsePlayer => {
  const {
    state: { context, player },
    dispatch,
  } = useGameContext();

  const drawPlayer = () => {
    context.beginPath();
    context.fillStyle = PLAYER_COLOR;
    context.fillRect(player.x, player.y, player.width, player.height);
  };

  const movePlayer = (direction: DIRECTONS) => {
    if (direction === DIRECTONS.Left && player.x - player.dx > 0) {
      return dispatch({
        type: "UPDATE_PLAYER",
        payload: { ...player, x: player.x - player.dx },
      });
    }
    if (direction === DIRECTONS.Right && player.x + player.dx < CANVAS_WIDTH) {
      return dispatch({
        type: "UPDATE_PLAYER",
        payload: { ...player, x: player.x + player.dx },
      });
    }
  };

  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case KEY_LEFT_CODE:
        movePlayer(DIRECTONS.Left);
        break;
      case KEY_RIGHT_CODE:
        movePlayer(DIRECTONS.Right);
        break;
    }
  };

  return { player, drawPlayer };
};

export default usePlayer;
