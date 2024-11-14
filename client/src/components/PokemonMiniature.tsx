import "../styles/PokemonMiniature.css";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import type { Data, PokemonMiniatureProps } from "../types/type";

export default function PokemonMiniature({ img, id }: PokemonMiniatureProps) {
  const data = useRouteLoaderData("data") as Data[];
  const pokemon = data.find((element) => element.id === id);
  const { name } = pokemon as Data;
  const navigate = useNavigate();

  const handleClickPokemon = () => {
    navigate(`/pokedex/${id}`);
  };

  return (
    <div
      className="pokemon-miniature-container"
      onClick={handleClickPokemon}
      onKeyDown={() => {}}
    >
      <img className="pokemon-miniature-img" src={img} alt="pokemon-img" />
      <p className="pokemon-miniature-name-hover">{name}</p>
    </div>
  );
}
