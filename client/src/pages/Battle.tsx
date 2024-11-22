import { useParams } from "react-router-dom";
import LogoVS from "/src/assets/images/logo_VS-removebg-preview 1.svg";
import PokemonBattleCard from "../components/PokemonBattleCard";
import "../styles/Battle.css";
import TournamentStatus from "../components/TournamentStatus";
import { useBattle } from "../contexts/BattleProvider";
import "../styles/TurnamentStatus.css";

export default function Battle() {
  const { currentMatch } = useParams();
  const { randomPokemon } = useBattle();
  const pokemon1 = randomPokemon[0][Number(currentMatch) - 1];
  const pokemon2 = randomPokemon[1][Number(currentMatch) - 1];

  return (
    <div className="battle-page">
      <TournamentStatus currentMatch={currentMatch} />
      <PokemonBattleCard
        name={pokemon1.name}
        id={pokemon1.id}
        img={pokemon1.img}
        imgShiny={pokemon1.imgShiny}
        isWinner={false}
      />
      <img src={LogoVS} alt="Versus" className="battle-versus" />
      <PokemonBattleCard
        name={pokemon2.name}
        id={pokemon2.id}
        img={pokemon2.img}
        imgShiny={pokemon2.imgShiny}
        isWinner={false}
      />
    </div>
  );
}
