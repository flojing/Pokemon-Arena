import { useRouteLoaderData } from "react-router-dom";
import PokemonMiniature from "../components/PokemonMiniature";
import "../styles/PokedexSearch.css";
import { useState } from "react";
import type { Data } from "../types/type";

export default function PokedexSearch() {
  const data = useRouteLoaderData("data") as Data[];
  const [valueInput, setValueInput] = useState("");

  return (
    <div className="pokedex-search-container">
      <h1 className="pokedex-search-title">Pokedex</h1>
      <input
        type="text"
        value={valueInput}
        onChange={(event) => {
          setValueInput(event.target.value);
        }}
        placeholder=" Rechercher"
        id="pokemon-search-input"
      />
      <div className="pokedex-search-pokemon">
        {data.map((element) => {
          if (element.name.toLowerCase().includes(valueInput.toLowerCase())) {
            return (
              <PokemonMiniature
                key={element.id}
                img={element.img}
                id={element.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
