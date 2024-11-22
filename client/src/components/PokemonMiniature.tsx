import "../styles/PokemonMiniature.css";
import { useNavigate } from "react-router-dom";
import type { PokemonMiniatureProps } from "../types/type";

export default function PokemonMiniature({
  img,
  id,
  name,
}: PokemonMiniatureProps) {
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
