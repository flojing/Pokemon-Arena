import { useParams } from "react-router-dom";
import LogoVS from "/src/assets/images/logo_VS-removebg-preview 1.svg";
import PokemonBattleCard from "../components/PokemonBattleCard";
import "../styles/Battle.css";
import TurnamentStatus from "../components/TurnamentStatus";
import { useBattle } from "../contexts/BattleProvider";
import "../styles/TurnamentStatus.css";

export default function Battle() {
  const { currentMatch } = useParams();
  const { randomPokemon } = useBattle();
  const samplePokemon = randomPokemon[0][Number(currentMatch) - 1];
  const samplePokemon2 = randomPokemon[1][Number(currentMatch) - 1];

  return (
    <div className="battle-page">
      <TurnamentStatus currentMatch={currentMatch} />
      <PokemonBattleCard
        name={samplePokemon.name}
        id={samplePokemon.id}
        img={samplePokemon.img}
        isWinner={false}
      />
      <img src={LogoVS} alt="Versus" className="battle-versus" />
      <PokemonBattleCard
        name={samplePokemon2.name}
        id={samplePokemon2.id}
        img={samplePokemon2.img}
        isWinner={false}
      />
    </div>
  );
}
