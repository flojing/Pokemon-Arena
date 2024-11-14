import { useParams, useRouteLoaderData } from "react-router-dom";
import "/src/styles/PokedexDetails.css";
import cryIcon from "/src/assets/images/cry.png";
import type { Data } from "../types/type";

export default function PokedexDetails() {
  /* const navigate = useNavigate(); */
  const data = useRouteLoaderData("data") as Data[];
  const { id } = useParams();
  const pokemon = data.find((element) => element.id === Number(id));
  const {
    name,
    img,
    /* imgShiny, */
    type,
    description,
    category,
    height,
    weight,
    /*  cry, */
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

  return (
    <div>
      <div className="details-container">
        <h1 className="details-title">Pokédex</h1>
        <ul className="details-name-container">
          <li className="details-pokemon-name">{name}</li>
          <li className="details-pokemon-id">
            <i>Pokedex ID : {convertID(id)}</i>
          </li>
        </ul>
        <ul className="details-species-container">
          <li className="details-type">
            <b className="bold-text">Type</b> : {type?.join(" / ")}
          </li>
          <li className="details-category">
            <b className="bold-text">Catégorie</b> : {category}
          </li>
        </ul>
        <img className="details-pokemon-photo" src={img} alt="Pokémon" />
      </div>
      <div className="details-description-container">
        <div className="image-shadow"> </div>
        <p className="details-description">
          <b className="bold-text">Description</b> : {description}
        </p>
        <div className="details-body-container">
          <div className="height-weight-container">
            <p className="details-height">
              <b className="bold-text">Taille</b> : {height} m
            </p>
            <p className="details-weight">
              <b className="bold-text">Poids</b> : {weight} Kg
            </p>
          </div>
          <div className="cry-container">
            <img className="cry-icon" src={cryIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
