import { type ReactNode, createContext, useContext, useState } from "react";
import type { BattleContextType, Data } from "../types/type";

export const BattleContext = createContext<BattleContextType | null>(null);

export default function BattleProvider({ children }: { children: ReactNode }) {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [match, setMatch] = useState<number>(0);
  const [matchWinner, setMatchWinner] = useState<Data[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<Data[][]>([[], []]);
  const [isBaseForm, setIsBaseForm] = useState<boolean>(false);
  const [isShinyBattle, setIsShinyBattle] = useState<boolean>(false);
  const [generationName, setGenerationName] = useState<string[]>([]);
  const [typeName, setTypeName] = useState<string[]>([]);

  const reset = () => {
    setGenerationName([]);
    setTypeName([]);
    setIsBaseForm(false);
    setIsShinyBattle(false);
  };

  const restart = () => {
    setMatchWinner([]);
    setRound(0);
    setMatch(0);
    reset();
  };

  return (
    <BattleContext.Provider
      value={{
        sliderValue,
        setSliderValue,
        round,
        setRound,
        match,
        setMatch,
        randomPokemon,
        setRandomPokemon,
        matchWinner,
        setMatchWinner,
        isBaseForm,
        setIsBaseForm,
        isShinyBattle,
        setIsShinyBattle,
        generationName,
        setGenerationName,
        typeName,
        setTypeName,
        reset,
        restart,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
}

export const useBattle = () => {
  const value = useContext(BattleContext);

  if (value == null) {
    throw new Error("You suck bruh");
  }

  return value;
};
