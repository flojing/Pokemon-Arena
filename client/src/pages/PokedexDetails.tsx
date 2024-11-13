import "/src/styles/PokedexDetails.css";

export default function PokedexDetails() {
  return (
    <div>
      <div className="details-container">
        <h1 className="details-title">Pokédex</h1>
        <ul className="details-name-container">
          <li className="details-pokemon-name">Carapuce</li>
          <li className="details-pokemon-id">
            <i>Pokedex ID : 0007</i>
          </li>
        </ul>
        <ul className="details-species-container">
          <li className="details-type">
            <b className="bold-text">Type</b> : Eau
          </li>
          <li className="details-category">
            <b className="bold-text">Catégorie</b> : Minitortue
          </li>
        </ul>
        <img
          className="details-pokemon-photo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
          alt=""
        />
      </div>
      <div className="details-description-container">
        <div className="image-shadow"> </div>
        <p className="details-description">
          <b className="bold-text">Description</b> : Lorsqu'il naît, sa carapace
          est molle, mais elle gagne tout de suite en élasticité et reprend sa
          forme initiale quand on appuie dessus. Ce Pokémon crache une écume
          redoutable. Après sa naissance, son dos gonfle et durcit pour former
          une carapace.
        </p>
        <ul className="details-body-container">
          <li className="details-height">
            <b className="bold-text">Taille</b> : 0,5 m
          </li>
          <li className="details-weight">
            <b className="bold-text">Poids</b> : 9 Kg
          </li>
          <li className="details-habitat">
            <b className="bold-text">Habitat naturel</b> : Marécage
          </li>
        </ul>
      </div>
    </div>
  );
}
