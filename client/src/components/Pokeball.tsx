import logoPokemon from "/src/assets/images/logo-pokemon-arena.png";
import "/src/styles/Pokeball.css";

export default function Pokeball() {
  return (
    <div className="pokeball">
      <div className="pokeball-red"> </div>
      <img
        src={logoPokemon}
        className="pokeball-logo"
        alt="Logo Pokémon Aréna"
      />
      <div className="pokeball-white"> </div>
    </div>
  );
}
