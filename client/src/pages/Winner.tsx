import "../styles/Winner.css";
import homeImage from "../assets/images/home.svg";
import restartImage from "../assets/images/restart.svg";
import { useNavigate } from "react-router-dom";

export default function Winner() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };
  const handleClickBattleSettings = () => {
    navigate("/battle-settings");
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
