import "/src/styles/Home.css";
import { useNavigate } from "react-router-dom";
import imgFirstButton from "/src/assets/images/Pokemon-removebg-preview 1.png";
import logoPokemon from "/src/assets/images/logo-pokemon-arena.png";
import imgSecondButton from "/src/assets/images/pokemon-pokedex-button.svg";
import Pokeball from "../components/Pokeball";

export default function Home() {
  const navigate = useNavigate();

  const handleClickPokedex = () => {
    navigate("/pokedex");
  };

  const handleClickBattleSettings = () => {
    navigate("/battle");
  };

  return (
    <>
      <Pokeball />
      <div className="home-container">
        <div className="home-page">
          <img
            className="home-logo-pokemon"
            src={logoPokemon}
            alt="Logo Pokemon Arena"
          />
          <h1 className="home-title">Bienvenue sur Pokémon Arena !</h1>
          <div className="home-paragraph">
            <p className="home-first-paragraph">
              Explorez notre Pokédex complet pour découvrir chaque Pokémon :
              types, statistiques, évolutions… toutes les informations pour
              devenir incollable !
            </p>
            <br />
            <p className="home-second-paragraph">
              Prêt pour le combat ? Choisissez votre Pokémon favori et
              lancez-vous dans des tournois épiques et personnalisés dans notre
              arène !
            </p>
          </div>
          <div className="home-nav">
            <button
              onClick={handleClickBattleSettings}
              type="button"
              className="home-button"
            >
              Battle
              <img
                className="home-img-battle-button"
                src={imgFirstButton}
                alt="Pokemon Pokeball"
              />
            </button>

            <button
              onClick={handleClickPokedex}
              type="button"
              className="home-button"
            >
              Pokedex
              <img
                className="home-img-pokedex-button"
                src={imgSecondButton}
                alt="Pokemon Pokedex"
              />
            </button>
          </div>
        </div>
        <footer className="home-footer">
          Made with <span className="home-heart">❤</span> by Justine, Florentin,
          Rémi et Julien
        </footer>
      </div>
    </>
  );
}
