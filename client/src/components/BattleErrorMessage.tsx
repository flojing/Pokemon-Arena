import { useNavigate } from "react-router-dom";
import "../styles/BattleErrorMessage.css";

export default function BattleErrorMessage() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="battle-error-container">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontWeight: "500" }}>Aucun pokémon dans l'arène</h1>
        <h1 style={{ fontWeight: "500" }}>Veuillez retourner à l'accueil</h1>
      </div>
      <button
        className="battle-error-button"
        type="button"
        onClick={handleClickHome}
      >
        Retourner à l'accueil
      </button>
    </div>
  );
}
