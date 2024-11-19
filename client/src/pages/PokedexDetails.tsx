import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import "/src/styles/PokedexDetails.css";
import { useState } from "react";
import cryIcon from "/src/assets/images/cry.png";
import returnArrow from "/src/assets/images/left-arrow.png";
import PokemonDetailsContent from "../components/PokemonNavSpecifications";
import type { Data } from "../types/type";

export default function PokedexDetails() {
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState(false);
  const data = useRouteLoaderData("data") as Data[];
  const { id } = useParams();
  const pokemon = data.find((element) => element.id === Number(id));
  const {
    name,
    img,
    imgShiny,
    type,
    description,
    category,
    height,
    weight,
    cry,
  } = pokemon || {
    height: 0,
    weight: 0,
  };
  const convertID = (id: string | undefined) => {
    if (Number(id) < 10) {
      return `00${id}`;
    }
    if (Number(id) < 100) {
      return `0${id}`;
    }
    return id;
  };
  const handleClickPlayCry = () => {
    const audio = new Audio(cry);
    audio.play();
  };
  const handleClickTurnShiny = () => {
    setIsShiny(!isShiny);
  };
  const handleClickBackToList = () => {
    navigate("/pokedex");
  };
  const prevId = Number.parseInt(id || "0") - 1;
  const nextId = Number.parseInt(id || "0") + 1;
  const handleClickPreviousPokemon = () => {
    if (prevId > 0) {
      navigate(`/pokedex/${prevId}`);
      setIsShiny(false);
    }
  };
  const handleClickNextPokemon = () => {
    if (nextId <= 151) {
      navigate(`/pokedex/${nextId}`);
      setIsShiny(false);
    }
  };
  return (
    <div className="details-page-container">
      <div className="details-container">
        <div className="pokedex-detail-header">
          <img
            onKeyDown={handleClickBackToList}
            onClick={handleClickBackToList}
            className="return-arrow-icon"
            src={returnArrow}
            alt="Fléche de retour en arrière"
          />
          <h1 className="details-title">Pokédex</h1>
        </div>
        <ul className="details-name-container">
          <li className="details-pokemon-name">{name}</li>
          <li className="details-pokemon-id">
            <i>Pokedex ID : {convertID(id)}</i>
          </li>
        </ul>
        <ul className="details-species-container">
          <li className="details-type">
            <b className="bold-text">Type</b> : {type?.join(" / ")}
          </li>
          <li className="details-category">
            <b className="bold-text">Catégorie</b> : {category}
          </li>
        </ul>
        <img
          onKeyDown={handleClickTurnShiny}
          onClick={handleClickTurnShiny}
          className="details-pokemon-photo"
          src={isShiny ? imgShiny : img}
          alt="Pokémon"
        />
      </div>
      <div className="details-description-container">
        <div className="image-shadow"> </div>
        <div className="details-navigation-tabs-container">
          <button type="button" className="specifications-button tab-buttons">
            Caractéristiques
          </button>
          <button type="button" className="statistics-button tab-buttons">
            Stats
          </button>
        </div>
        <PokemonDetailsContent
          description={description}
          height={height}
          weight={weight}
          handleClickPlayCry={handleClickPlayCry}
          cryIcon={cryIcon}
        />
        <div className="pokedex-details-navigation-container">
          {prevId > 0 && (
            <div
              className="pokedex-details-navigation-previous-next-container"
              onKeyDown={handleClickPreviousPokemon}
              onClick={handleClickPreviousPokemon}
            >
              <img
                className="previous-pokemon-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevId}.png`}
                alt="Pokémon précédent"
              />
              <p>‹ Précédent</p>
            </div>
          )}
          <div> </div>
          {nextId < 152 && (
            <div
              className="pokedex-details-navigation-previous-next-container"
              onKeyDown={handleClickNextPokemon}
              onClick={handleClickNextPokemon}
            >
              <img
                className="next-pokemon-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`}
                alt="Pokémon suivant"
              />
              <p>Suivant ›</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
