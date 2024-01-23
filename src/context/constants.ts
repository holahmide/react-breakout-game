export const CANVAS_WIDTH = 700;

export const CANVAS_HEIGHT = 500;

export const BLOCK_WIDTH = 45;

export const BLOCK_HEIGHT = 20;

export const BLOCK_SCORE = 10;

export const INITIAL_STATE = {
  availableBlocks: [],
  ball: {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    width: 5,
    height: 5,
    dx: 5,
    dy: 2,
    radius: 5,
    color: "red",
  },
  context: {} as CanvasRenderingContext2D,
  player: {
    width: 70,
    height: 15,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 20,
    dx: 30,
  },
  gameActive: false,
  gameOver: false,
  score: 0,
};
