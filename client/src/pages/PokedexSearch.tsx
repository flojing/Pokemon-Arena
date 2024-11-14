import { useRouteLoaderData } from "react-router-dom";
import PokemonMiniature from "../components/PokemonMiniature";
import "../styles/PokedexSearch.css";
import type { Data } from "../types/type";

export default function PokedexSearch() {
  const data = useRouteLoaderData("data") as Data[];

  return (
    <div className="pokedex-search-page">
      <h1 className="pokedex-search-title">Pokedex</h1>
      <div className="pokedex-search-pokemon">
        {data.map((element) => (
          <PokemonMiniature
            key={element.id}
            img={element.img}
            id={element.id}
          />
        ))}
      </div>
    </div>
  );
}
