import "../styles/Winner.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/images/home.svg";
import restartImage from "../assets/images/restart.svg";
import MouseFollower from "../components/MouseFollower";
import PokemonBattleCard from "../components/PokemonBattleCard";
import { useBattle } from "../contexts/BattleProvider";

export default function Winner() {
  const navigate = useNavigate();
  const { matchWinner, reset, setMatchWinner, restart } = useBattle();
  const { name, id, img, imgShiny } = matchWinner[0];

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      cardContainerRef.current &&
      cardRef.current &&
      window.innerWidth >= 900
    ) {
      const rect = cardContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xRotation = (y / rect.height - 0.5) * 30;
      const yRotation = (x / rect.width - 0.5) * -30;

      setRotation({ x: xRotation, y: yRotation });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

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
      {window.innerWidth >= 900 && <MouseFollower id={id} />}
      <h1 id="champion-title">Champion</h1>
      <div
        ref={cardContainerRef}
        className="winner-card-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="card"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <PokemonBattleCard
            name={name}
            id={id}
            img={img}
            imgShiny={imgShiny}
            isWinner={true}
          />
        </div>
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
