import { useEffect, useState } from "react";
import logoPokemon from "/src/assets/images/logo-pokemon-arena.png";
import "/src/styles/Pokeball.css";

export default function Pokeball() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [shouldVibrate, setShouldVibrate] = useState(false);

  useEffect(() => {
    const vibrateTimeout = setTimeout(() => {
      if (!isOpen) {
        setShouldVibrate(true);
      }
    }, 3000);

    return () => clearTimeout(vibrateTimeout);
  }, [isOpen]);

  const handleClickLogoOpening = () => {
    setIsOpen(true);
    setShouldVibrate(false);
    setTimeout(() => {
      setIsAnimationCompleted(true);
    }, 1000);
  };
  return (
    <div className={`pokeball ${isAnimationCompleted ? "hidden" : ""}`}>
      <div
        className={`pokeball-red ${isOpen ? "open" : ""}`}
        hidden={isAnimationCompleted}
      >
        {" "}
      </div>
      <img
        onClick={handleClickLogoOpening}
        onKeyDown={handleClickLogoOpening}
        src={logoPokemon}
        className={`pokeball-logo ${isOpen ? "move-to-header" : ""} ${
          shouldVibrate ? "vibrate" : ""
        }`}
        alt="Logo Pokémon Aréna"
      />
      <div
        className={`pokeball-white ${isOpen ? "open" : ""}`}
        hidden={isAnimationCompleted}
      >
        {" "}
      </div>
    </div>
  );
}
