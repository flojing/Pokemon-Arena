import { useEffect, useState } from "react";
import logoPokemon from "../assets/images/logo-pokemon-arena.png";
import "../styles/Pokeball.css";

const DracaufeuGif =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif";

export default function Pokeball() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [shouldVibrate, setShouldVibrate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("pokeballAnimationSeen");
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
      sessionStorage.setItem("pokeballAnimationSeen", "true");
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
        className={`pokeball-logo ${isOpen && !isAnimationCompleted ? "move-to-header" : ""} ${
          shouldVibrate ? "vibrate" : ""
        } ${isOpen && isAnimationCompleted ? "final-position" : ""}`}
        alt="Logo Pokémon Aréna"
      />
      {showHelp && !isOpen && (
        <div className="help-container">
          <img src={DracaufeuGif} alt="Dracaufeu" className="Dracaufeu-gif" />
          <p className="help-text">
            Cliquez sur le logo <br />
            pour entrer dans l'arène
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
