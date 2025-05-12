import { useNavigate } from "react-router-dom";
import PokemonMiniature from "../components/PokemonMiniature";
import "../styles/PokedexSearch.css";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import returnArrow from "/src/assets/images/left-arrow.png";
import downWhite from "../assets/images/down-white.svg";
import imageSearchBar from "../assets/images/loupe.svg";
import upWhite from "../assets/images/up-white.svg";
import SettingFilter from "../components/SettingFilter";
import { useBattle } from "../contexts/BattleProvider";
import { useData } from "../contexts/DataProvider";
import { formatedType } from "../services/utils";
import type { Data } from "../types/type";

export default function PokedexSearch() {
  const navigate = useNavigate();
  const { data } = useData();
  const [valueInput, setValueInput] = useState<string>("");
  const [isFilters, setIsFilters] = useState<boolean>(false);
  const [dataPokemon, setDataPokemon] = useState<Data[] | null>(data);
  const { isBaseForm, generationName, typeName, reset } = useBattle();

  useEffect(() => {
    setDataPokemon(data);
    if (isBaseForm) {
      setDataPokemon((prev: Data[] | null): Data[] | null => {
        if (prev === null) return null;
        return prev.filter((elem) => elem.baseForm === null);
      });
    }

    if (typeName.length !== 0) {
      setDataPokemon((prev) => {
        if (prev === null) return null;
        return prev.filter((elem) => {
          if (elem.type) {
            let containType = false;
            for (const element of elem.type) {
              const type = formatedType(element);
              if (typeName.includes(type)) {
                containType = true;
              }
            }
            return containType;
          }
        });
      });
    }

    if (generationName.length !== 0) {
      setDataPokemon((prev) => {
        if (prev === null) return null;
        return prev?.filter((elem) => {
          return generationName.some((element) =>
            elem.generation?.includes(element[11]),
          );
        });
      });
    }
  }, [isBaseForm, data, typeName, generationName]);

  const handleClickBackToHome = () => {
    reset();
    navigate("/");
  };

  const handleClickFilters = () => {
    setIsFilters(!isFilters);
  };

  return (
    <div className="pokedex-search-container">
      <div className="pokedex-header">
        <img
          onClick={handleClickBackToHome}
          onKeyDown={handleClickBackToHome}
          className="return-home-icon"
          src={returnArrow}
          alt="Retour Home"
        />
        <div className="pokedex-search-title-container">
          <h1 className="pokedex-search-title">Pokédex</h1>
        </div>
      </div>
      <form
        id="pokedex-search-bar"
        onSubmit={(event) => event.preventDefault()}
      >
        <img id="imageSearchBar" src={imageSearchBar} alt="loupe" />
        <input
          type="text"
          value={valueInput}
          onChange={(event) => {
            setValueInput(event.target.value);
          }}
          placeholder="Rechercher"
          id="pokemon-search-input"
        />
      </form>
      <div className="pokedex-search-filter">
        <button
          className="battle-filters-button"
          type="button"
          onClick={handleClickFilters}
        >
          Filtres{" "}
          <img
            src={!isFilters ? downWhite : upWhite}
            alt=""
            className="battle-filter-img-button"
          />
        </button>
        <Collapse in={isFilters}>
          <SettingFilter filter="pokedex" />
        </Collapse>
      </div>
      <div className="pokedex-search-pokemon">
        {dataPokemon?.map((element: Data) => {
          if (element.name?.toLowerCase().includes(valueInput.toLowerCase())) {
            return (
              <PokemonMiniature
                key={element.id}
                img={element.img}
                name={element.name}
                id={element.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
