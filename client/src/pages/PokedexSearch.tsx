import { useNavigate, useRouteLoaderData } from "react-router-dom";
import PokemonMiniature from "../components/PokemonMiniature";
import "../styles/PokedexSearch.css";
import { useState } from "react";
import returnArrow from "/src/assets/images/left-arrow.png";
import imageSearchBar from "../assets/images/loupe.svg";
import type { Data } from "../types/type";

export default function PokedexSearch() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("data") as Data[];
  const [valueInput, setValueInput] = useState("");

  const handleClickBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="pokedex-search-container">
      <div className="pokedex-header">
        <img
          onClick={handleClickBackToHome}
          onKeyDown={handleClickBackToHome}
          className="return-home-icon"
          src={returnArrow}
          alt="Retour Home"
        />
        <div className="pokedex-search-title-container">
          <h1 className="pokedex-search-title">Pokedex</h1>
        </div>
      </div>
      <div id="pokedex-search-bar">
        <img id="imageSearchBar" src={imageSearchBar} alt="loupe" />
        <input
          type="text"
          value={valueInput}
          onChange={(event) => {
            setValueInput(event.target.value);
          }}
          placeholder="Rechercher"
          id="pokemon-search-input"
        />
      </div>
      <div className="pokedex-search-pokemon">
        {data.map((element) => {
          if (element.name?.toLowerCase().includes(valueInput.toLowerCase())) {
            return (
              <PokemonMiniature
                key={element.id}
                img={element.img}
                name={element.name}
                id={element.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
