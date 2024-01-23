import { useEffect, useRef } from "react";
import { useGameContext } from "../../context";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../context/constants";
import "./styles.scss";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { dispatch } = useGameContext();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    dispatch({ type: "SET_CONTEXT", payload: context });
  }, [dispatch]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    ></canvas>
  );
};

export default Canvas;
