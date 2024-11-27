import { useEffect, useState } from "react";
import logoPokemon from "/src/assets/images/logo-pokemon-arena.png";
import "/src/styles/Pokeball.css";

const DracaufeuGif =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif";

export default function Pokeball() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [shouldVibrate, setShouldVibrate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem("pokeballAnimationSeen");
    if (hasSeenAnimation) {
      setIsAnimationCompleted(true);
      setIsOpen(true);
      return;
    }

    const vibrateTimeout = setTimeout(() => {
      if (!isOpen) {
        setShouldVibrate(true);
      }
    }, 3000);

    const helpTimeout = setTimeout(() => {
      if (!isOpen) {
        setShowHelp(true);
      }
    }, 5000);

    return () => {
      clearTimeout(vibrateTimeout);
      clearTimeout(helpTimeout);
    };
  }, [isOpen]);

  const handleClickLogoOpening = () => {
    setIsOpen(true);
    setShouldVibrate(false);
    setTimeout(() => {
      setIsAnimationCompleted(true);
      localStorage.setItem("pokeballAnimationSeen", "true");
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
      {showHelp && !isOpen && (
        <div className="help-container">
          <img src={DracaufeuGif} alt="Dracaufeu" className="Dracaufeu-gif" />
          <p className="help-text">
            Cliquez sur le logo pour rentrer dans l'arène
          </p>
        </div>
      )}

      <div
        className={`pokeball-white ${isOpen ? "open" : ""}`}
        hidden={isAnimationCompleted}
      >
        {" "}
      </div>
    </div>
  );
}
