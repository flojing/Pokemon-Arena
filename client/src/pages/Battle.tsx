import { useRouteLoaderData } from "react-router-dom";
import LogoVS from "/src/assets/images/logo_VS-removebg-preview 1.svg";
import PokemonBattleCard from "../components/PokemonBattleCard";
import "../styles/Battle.css";
import type { Data } from "../types/type";

export default function Battle() {
  const data = useRouteLoaderData("data") as Data[];
  // const { sliderValue } = useContext(BattleSettingsContext);
  // const numberOfPokemon = [8, 16, 32, 64];
  const samplePokemon = data[24];
  const samplePokemon2 = data[2];
  return (
    <div className="battle-page">
      <PokemonBattleCard
        name={samplePokemon.name}
        id={samplePokemon.id}
        img={samplePokemon.img}
        type={samplePokemon.type}
        description={samplePokemon.description}
      />
      <img src={LogoVS} alt="Versus" className="battle-versus" />
      <PokemonBattleCard
        name={samplePokemon2.name}
        id={samplePokemon2.id}
        img={samplePokemon2.img}
        type={samplePokemon2.type}
        description={samplePokemon2.description}
      />
    </div>
  );
}
