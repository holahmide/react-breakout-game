import { useGameContext } from "../context";

export interface Ball {
  color: string;
  dx: number;
  dy: number;
  x: number;
  y: number;
  height: number;
  radius: number;
  width: number;
}

interface UseBall {
  ball: Ball;
  drawBall: () => void;
  moveBall: () => void;
}

const BALL_COLOR = "red";

const useBall = (): UseBall => {
  const { state, dispatch } = useGameContext();

  const { context, ball } = state;

  const drawBall = () => {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = BALL_COLOR;
    context.fill();
  };

  const moveBall = () => {
    dispatch({
      type: "SET_BALL",
    });
  };

  return { ball, drawBall, moveBall };
};

export default useBall;
