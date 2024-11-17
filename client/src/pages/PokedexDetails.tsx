import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import "/src/styles/PokedexDetails.css";
import { useState } from "react";
import cryIcon from "/src/assets/images/cry.png";
import returnArrow from "/src/assets/images/left-arrow.png";
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
  const handleClickPreviousPokemon = () => {
    const prevId = Number.parseInt(id || "0") - 1;
    if (prevId > 0) {
      navigate(`/pokedex/${prevId}`);
    }
  };
  const handleClickNextPokemon = () => {
    const nextId = Number.parseInt(id || "0") + 1;
    if (nextId <= 151) {
      navigate(`/pokedex/${nextId}`);
    }
  };
  const prevId = Number.parseInt(id || "0") - 1;
  const nextId = Number.parseInt(id || "0") + 1;
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
        <p className="details-description">
          <b className="bold-text">Description</b> : {description}
        </p>
        <div className="details-body-container">
          <div className="height-weight-container">
            <p className="details-height">
              <b className="bold-text">Taille</b> : {height} m
            </p>
            <p className="details-weight">
              <b className="bold-text">Poids</b> : {weight} Kg
            </p>
          </div>

          <img
            onKeyDown={handleClickPlayCry}
            onClick={handleClickPlayCry}
            className="cry-icon"
            src={cryIcon}
            alt=""
          />
        </div>
        <div className="pokedex-details-navigation-container">
          <div className="pokedex-details-navigation-previous-container">
            <img
              className="previous-pokemon-img"
              onKeyDown={handleClickPreviousPokemon}
              onClick={handleClickPreviousPokemon}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${prevId}.gif`}
              alt="Pokémon précédent"
            />
            <p>Précédent</p>
          </div>
          <div className="pokedex-details-navigation-next-container">
            <img
              className="next-pokemon-img"
              onKeyDown={handleClickNextPokemon}
              onClick={handleClickNextPokemon}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${nextId}.gif`}
              alt="Pokémon suivant"
            />
            <p>Suivant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
