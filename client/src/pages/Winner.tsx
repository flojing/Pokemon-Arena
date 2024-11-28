import "../styles/Winner.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/images/home.svg";
import restartImage from "../assets/images/restart.svg";
import PokemonBattleCard from "../components/PokemonBattleCard";
import { useBattle } from "../contexts/BattleProvider";

export default function Winner() {
  const navigate = useNavigate();
  const { matchWinner, reset, setMatchWinner, restart } = useBattle();
  const { name, id, img, imgShiny } = matchWinner[0];

  const handleClickHome = () => {
    setMatchWinner([]);
    reset();
    navigate("/");
  };
  const handleClickBattleSettings = () => {
    setMatchWinner([]);
    reset();
    navigate("/battle");
  };

  useEffect(() => {
    const handlePopState = () => {
      restart();
      navigate("/battle");
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, restart]);

  return (
    <div id="winner-page">
      <h1 id="champion-title">Champion</h1>
      <div className="winner-card-container">
        <PokemonBattleCard
          name={name}
          id={id}
          img={img}
          imgShiny={imgShiny}
          isWinner={true}
        />
      </div>
      <nav id="winner-nav">
        <button
          onClick={handleClickHome}
          type="button"
          className="winner-button-nav"
        >
          <img className="winner-image-button" src={homeImage} alt="home" />
          Accueil
        </button>
        <button
          onClick={handleClickBattleSettings}
          type="button"
          className="winner-button-nav"
        >
          <img
            className="winner-image-button"
            src={restartImage}
            alt="restart"
          />
          Relancer
        </button>
      </nav>
    </div>
  );
}
