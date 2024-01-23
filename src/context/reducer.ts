import { BLOCK_SCORE } from "./constants";
import { GameActions, GameState } from "./interfaces";
import { INITIAL_STATE } from "./constants";

export const gameReducer = (
  state: GameState,
  action: GameActions
): GameState => {
  switch (action.type) {
    case "SET_CONTEXT":
      return {
        ...state,
        context: action.payload,
      };
    case "SET_BALL":
      return {
        ...state,
        ball: {
          ...state.ball,
          x: state.ball.x + state.ball.dx,
          y: state.ball.y + state.ball.dy,
        },
      };
    case "UPDATE_BALL":
      return {
        ...state,
        ball: {
          ...state.ball,
          ...action.payload,
        },
      };
    case "SET_BLOCKS":
      return {
        ...state,
        availableBlocks: action.payload,
      };
    case "UPDATE_PLAYER":
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload,
        },
      };
    case "INCREASE_SCORE":
      return {
        ...state,
        score: state.score + BLOCK_SCORE,
      };
    case "SET_GAME_OVER":
      return {
        ...state,
        gameOver: true,
      };
    case "SET_GAME_ACTIVE":
      return {
        ...state,
        gameActive: !state.gameActive,
      };
    case "RESTART_GAME":
      return {
        ...INITIAL_STATE,
        context: state.context,
      };
    default:
      return state;
  }
};
