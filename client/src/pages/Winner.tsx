import "../styles/Winner.css";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/images/home.svg";
import restartImage from "../assets/images/restart.svg";
import { useBattle } from "../contexts/BattleProvider";

export default function Winner() {
  const navigate = useNavigate();
  const { setMatchWinner } = useBattle();

  const handleClickHome = () => {
    setMatchWinner([]);
    navigate("/");
  };
  const handleClickBattleSettings = () => {
    setMatchWinner([]);
    navigate("/battle");
  };

  return (
    <div id="winner-page">
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
