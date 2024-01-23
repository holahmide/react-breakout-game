import { ReactNode, useReducer } from "react";
import { GameContext } from ".";
import { gameReducer } from "./reducer";
import { INITIAL_STATE } from "./constants";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
