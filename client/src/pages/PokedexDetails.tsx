import { useNavigate, useParams } from "react-router-dom";
import "/src/styles/PokedexDetails.css";
import { useEffect, useState } from "react";
import returnArrow from "/src/assets/images/left-arrow.png";
import cryIcon from "/src/assets/images/picto_musique_fond_blanc.svg";
import PokemonDetailsContent from "../components/PokemonNavSpecifications";
import PokemonNavStats from "../components/PokemonNavStats";
import { useData } from "../contexts/DataProvider";
import { getPokemonTypesTranslation } from "../services/getApi";
import type { PokedexDetailsProps } from "../types/type";

export default function PokedexDetails({
  idBattle,
  isBattle,
}: PokedexDetailsProps) {
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState(false);
  const [typeNames, setTypeNames] = useState<string[] | null>(null);
  const [activeTab, setActiveTab] = useState("specs");
  const { data } = useData();
  const { id } = useParams();
  const prevId = Number.parseInt(id || "0") - 1;
  const nextId = Number.parseInt(id || "0") + 1;
  const pokemon = data?.find(
    (element) => element.id === Number(isBattle ? idBattle : id),
  );
  const {
    name,
    img,
    imgShiny,
    type,
    description,
    category,
    stats,
    height,
    weight,
    cry,
  } = pokemon || {
    height: 0,
    weight: 0,
  };

  const convertID = (id: string | undefined) => {
    if (Number(id) < 10) {
      return `00${id}`;
    }
    if (Number(id) < 100) {
      return `0${id}`;
    }
    return id;
  };

  const handleClickPlayCry = () => {
    const audio = new Audio(cry);
    audio.play();
  };

  const handleClickTurnShiny = () => {
    setIsShiny(!isShiny);
  };

  const handleClickBackToList = () => {
    navigate("/pokedex");
  };

  const handleClickPreviousPokemon = () => {
    if (prevId > 0) {
      navigate(`/pokedex/${prevId}`);
      setIsShiny(false);
    }
  };
  const handleClickNextPokemon = () => {
    if (nextId <= 898) {
      navigate(`/pokedex/${nextId}`);
      setIsShiny(false);
    }
  };

  useEffect(() => {
    const getTypes = async () => {
      if (type) {
        const translatedTypes = [];
        for (const url of type) {
          const translatedType = await getPokemonTypesTranslation(url, "fr");
          translatedTypes.push(translatedType);
        }
        setTypeNames(translatedTypes);
      }
    };
    getTypes();
  }, [type]);

  if (typeNames === null) {
    return;
  }

  return (
    <div
      className={!isBattle ? "details-page-container" : "modal-page-container"}
    >
      <div className="details-container">
        <div className="pokedex-detail-header">
          {!isBattle && (
            <img
              onKeyDown={handleClickBackToList}
              onClick={handleClickBackToList}
              className="return-arrow-icon"
              src={returnArrow}
              alt="Fléche de retour en arrière"
            />
          )}
          <div> </div>
          {!isBattle && <h1 className="details-title">Pokédex</h1>}
        </div>
        <div className="info-and-img-container">
          <div className="main-info-container">
            <div className="details-name-container">
              <p className="details-pokemon-name">{name}</p>
              <p className="details-pokemon-id">
                <i>
                  Pokedex ID : {convertID(isBattle ? idBattle?.toString() : id)}
                </i>
              </p>
            </div>
            <div className="details-species-container">
              <div className="details-type">
                <b className="bold-text">Type</b> : {typeNames?.join(" / ")}
              </div>
              <div className="details-category">
                <b className="bold-text">Catégorie</b> : {category}
              </div>
            </div>
            <div className="description-responsive">
              <PokemonDetailsContent
                description={description}
                height={height}
                weight={weight}
                handleClickPlayCry={handleClickPlayCry}
                cryIcon={cryIcon}
              />
            </div>
          </div>
          <div className="img-container">
            <img
              onKeyDown={handleClickTurnShiny}
              onClick={handleClickTurnShiny}
              className="details-pokemon-photo"
              src={isShiny ? imgShiny : img}
              alt="Pokémon"
            />
          </div>
        </div>
      </div>
      <div className="details-description-container">
        <div className="shadow-and-nav-container">
          <div className="image-shadow"> </div>
          <div className="details-navigation-tabs-container">
            <button
              type="button"
              className={`specifications-button tab-buttons ${activeTab === "specs" ? "active" : ""}`}
              onClick={() => setActiveTab("specs")}
              disabled={activeTab === "specs"}
            >
              Caractéristiques
            </button>
            <button
              type="button"
              className={`statistics-button tab-buttons ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => setActiveTab("stats")}
              disabled={activeTab === "stats"}
            >
              Stats
            </button>
          </div>

          {activeTab === "specs" && (
            <div className="pokemon-details-mobile">
              <PokemonDetailsContent
                description={description}
                height={height}
                weight={weight}
                handleClickPlayCry={handleClickPlayCry}
                cryIcon={cryIcon}
              />
            </div>
          )}

          {(activeTab === "stats" || window.innerWidth >= 768) && (
            <PokemonNavStats stats={stats} />
          )}
        </div>

        <div className="pokedex-details-navigation-container">
          {prevId > 0 && !isBattle && (
            <div
              className="pokedex-details-navigation-previous-next-container"
              onKeyDown={handleClickPreviousPokemon}
              onClick={handleClickPreviousPokemon}
            >
              <img
                className="previous-pokemon-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevId}.png`}
                alt="Pokémon précédent"
              />
              <p>‹ Précédent</p>
            </div>
          )}
          <div> </div>
          {nextId < 899 && !isBattle && (
            <div
              className="pokedex-details-navigation-previous-next-container"
              onKeyDown={handleClickNextPokemon}
              onClick={handleClickNextPokemon}
            >
              <img
                className="next-pokemon-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`}
                alt="Pokémon suivant"
              />
              <p>Suivant ›</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
