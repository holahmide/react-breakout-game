import { Dispatch } from "react";
import { Ball } from "../hooks/useBall";
import { Block } from "../hooks/useBlocks";
import { Player } from "../hooks/usePlayer";

export interface GameState {
  availableBlocks: Block[];
  ball: Ball;
  context: CanvasRenderingContext2D;
  gameActive: boolean;
  gameOver: boolean;
  player: Player;
  score: number;
}

export interface GameContextProps {
  state: GameState;
  dispatch: Dispatch<GameActions>;
}

export type GameActions =
  | {
      type: "SET_CONTEXT";
      payload: CanvasRenderingContext2D;
    }
  | {
      type: "SET_BALL";
    }
  | {
      type: "UPDATE_BALL";
      payload: Partial<Ball>;
    }
  | {
      type: "SET_BLOCKS";
      payload: Block[];
    }
  | {
      type: "UPDATE_PLAYER";
      payload: Partial<Player>;
    }
  | {
      type: "INCREASE_SCORE";
    }
  | {
      type: "SET_GAME_ACTIVE";
    }
  | {
      type: "SET_GAME_OVER";
    }
  | {
      type: "RESTART_GAME";
    };
