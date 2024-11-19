import { type ReactNode, createContext, useContext, useState } from "react";
import type { Context } from "../types/type";

export const BattleSettingsContext = createContext<Context | null>(null);

export default function BattleSettingsProvider({
  children,
}: { children: ReactNode }) {
  const [sliderValue, setSliderValue] = useState<number>(1);

  return (
    <BattleSettingsContext.Provider value={{ sliderValue, setSliderValue }}>
      {children}
    </BattleSettingsContext.Provider>
  );
}

export const useBattle = () => {
  const value = useContext(BattleSettingsContext);

  if (value == null) {
    throw new Error("You suck bruh");
  }

  return value;
};
