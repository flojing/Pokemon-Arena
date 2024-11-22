import CustomizedSlider from "../components/CustomizedSlider";
import "../styles/BattleSettings.css";
import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import returnArrow from "/src/assets/images/left-arrow.png";
import monImage from "../assets/images/button-play-pokeball.png";
import SettingFilter from "../components/SettingFilter";
import { useBattle } from "../contexts/BattleProvider";
import type { Data } from "../types/type";

export default function BattleSettings() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("data") as Data[];
  const {
    sliderValue,
    setRound,
    setMatch,
    setRandomPokemon,
    isBaseForm,
    generationName,
    //typeName,
  } = useBattle();
  const roundArray = [3, 4, 5, 6];
  const matchArray = [4, 8, 16, 32];
  const numberOfPokemonArray = [8, 16, 32, 64];

  const randomizer = () => {
    let prevData: Data[] = data;
    const rawResult: Data[] = [];
    const result = [];
    let i = 0;

    if (isBaseForm) {
      prevData = prevData.filter((elem) => elem.baseForm === null);
    }

    if (generationName.length !== 0) {
      prevData = prevData.filter((elem) => {
        for (const element of generationName) {
          return elem.generation?.includes(element[11]);
        }
      });
    }

    // if (typeName.length !== 0) {
    //   prevData = prevData.filter((elem) => {
    //     for (const element of typeName) {
    //     }
    //   });
    // }

    while (i < numberOfPokemonArray[sliderValue]) {
      const random = Math.floor(Math.random() * prevData.length);
      if (!rawResult.includes(prevData[random])) {
        rawResult.push(prevData[random]);
        i++;
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

  const [isFilters, setIsFilters] = useState(false);

  const handleClickFilters = () => {
    setIsFilters(!isFilters);
  };

  const handleClickBackToHome = () => {
    navigate("/");
  };

  return (
    <div id="battle-settings-page">
      <div className="return-button-header">
        <img
          onClick={handleClickBackToHome}
          onKeyDown={handleClickBackToHome}
          className="return-home-icon"
          src={returnArrow}
          alt="Retour Home"
        />
        <h1 id="battle-settings-title">Battle</h1>
      </div>
      <header id="battle-settings-header">
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
          <div className="battle-setting-filter">
            <div className="battle-settings-filter-button-container">
              <button
                className="battle-filters-button"
                type="button"
                onClick={handleClickFilters}
              >
                Filtres
              </button>
            </div>
            {isFilters && <SettingFilter />}
          </div>
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
