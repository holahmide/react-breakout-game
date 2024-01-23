/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { GameContextProps } from "./interfaces";

export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps
);

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};
