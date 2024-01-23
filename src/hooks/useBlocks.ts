import { useCallback, useEffect } from "react";
import { useGameContext } from "../context";
import { BLOCK_HEIGHT, BLOCK_WIDTH, CANVAS_WIDTH } from "../context/constants";

export interface Block {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface UseBlocks {
  showRectangles: () => void;
  generateBlocks: () => void;
}

const xSpacing = 8;
const ySpacing = 8;
const BLOCK_COLOR = "orange";

const useBlocks = (): UseBlocks => {
  const {
    state: { context, availableBlocks },
    dispatch,
  } = useGameContext();

  const generateBlocks = useCallback(() => {
    const columns = Math.ceil(
      CANVAS_WIDTH / Number(xSpacing * 1.5 + BLOCK_WIDTH)
    );
    const rows = 3;
    const blocks: Block[] = [];
    [...Array(rows)].forEach((_, rowIndex) => {
      [...Array(columns)].forEach((_, columnIndex) => {
        const x = columnIndex * BLOCK_WIDTH;
        const y = rowIndex * BLOCK_HEIGHT;
        const offsetX = xSpacing * Number(columnIndex + 1);
        const offsetY = ySpacing * Number(rowIndex + 1);
        blocks.push({
          x: x + offsetX,
          y: y + offsetY,
          width: BLOCK_WIDTH,
          height: BLOCK_HEIGHT,
        });
      });
    });

    dispatch({ type: "SET_BLOCKS", payload: blocks });
  }, [dispatch]);

  useEffect(() => {
    generateBlocks();
  }, [generateBlocks]);

  const showRectangles = () => {
    availableBlocks.forEach((block) => {
      context.fillStyle = BLOCK_COLOR;
      context.fillRect(block.x, block.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    });
  };

  return { showRectangles, generateBlocks };
};

export default useBlocks;
