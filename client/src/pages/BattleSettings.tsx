import CustomizedSlider from "../components/CustomizedSlider";
import "../styles/BattleSettings.css";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import monImage from "../assets/images/button-play-pokeball.png";
import { useBattle } from "../contexts/BattleProvider";
import type { Data } from "../types/type";

export default function BattleSettings() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("data") as Data[];
  const { sliderValue, setRound, setMatch, setRandomPokemon } = useBattle();
  const roundArray = [3, 4, 5, 6];
  const matchArray = [4, 8, 16, 32];
  const numberOfPokemonArray = [8, 16, 32, 64];

  const randomizer = () => {
    const rawResult: Data[] = [];
    const result = [];
    for (let i = 0; i < numberOfPokemonArray[sliderValue]; i++) {
      const random = Math.floor(Math.random() * 151);
      if (!rawResult.includes(data[random])) {
        rawResult.push(data[random]);
      } else {
        i--;
      }
    }
    const array1 = rawResult.filter(
      (_: Data, index: number) => index % 2 === 0,
    );
    const array2 = rawResult.filter(
      (_: Data, index: number) => index % 2 !== 0,
    );
    result.push(array1);
    result.push(array2);
    setRandomPokemon(result);
  };

  const handleClickBattle = () => {
    setRound(roundArray[sliderValue]);
    setMatch(matchArray[sliderValue]);
    randomizer();
    navigate(`/battle/${roundArray[sliderValue]}/1`);
  };

  return (
    <div id="battle-settings-page">
      <header id="battle-settings-header">
        <h1 id="battle-settings-title">Battle</h1>
        <p id="battle-settings-text">
          <span>Prêt à découvrir quel Pokémon est vraiment ton préféré ?</span>
          <br />
          Dans cette Battle, crée ton propre tournoi en opposant des Pokémon
          aléatoires en face-à-face ! À chaque tour, deux Pokémon s'affrontent,
          et c'est toi qui choisis celui qui continuera l'aventure jusqu'à la
          finale.
          <br />
          <br />
          Avant de lancer la bataille, ajuste les paramètres pour créer le
          tournoi parfait : choisis le nombre de participants (8, 16, 32 ou 64)
          et filtre-les par type ou par génération. Que tu aies un faible pour
          les Pokémon de Kanto, ceux de Sinnoh, ou que tu préfères les types Feu
          ou Eau, cette Battle s’adapte à toutes tes préférences. À toi de
          jouer, et que le meilleur Pokémon l'emporte !
        </p>
      </header>
      <div id="settings-section">
        <div id="settings-ajustments">
          <button className="battle-filters-button" type="button">
            Filtres
          </button>
          <CustomizedSlider />
        </div>
        <button
          onClick={handleClickBattle}
          className="go-to-button"
          type="button"
        >
          Play ! <img className="img-button" src={monImage} alt="Pokéball" />
        </button>
      </div>
    </div>
  );
}
