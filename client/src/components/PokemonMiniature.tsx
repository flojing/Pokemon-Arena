import "../styles/PokemonMiniature.css";
import { useNavigate } from "react-router-dom";
import type { PokemonMiniatureProps } from "../types/type";

export default function PokemonMiniature({ img, id }: PokemonMiniatureProps) {
  const navigate = useNavigate();

  const handleClickPokemon = () => {
    navigate(`/pokedex/${id}`);
  };

  return (
    <div
      className="miniature-container"
      onClick={handleClickPokemon}
      onKeyDown={() => {}}
    >
      <img className="miniature-img" src={img} alt="pokemon-img" />
    </div>
  );
}
