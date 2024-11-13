import "/src/styles/Home.css";
import logoPokemon from "/src/assets/images/logo-pokemon-arena.png";

export default function Home() {
  return (
    <div className="home">
      <div className="homePage">
        <img src={logoPokemon} alt="Logo Pokemon Arena" />
        <h1>Bienvenue sur Pokémon Arena !</h1>
        <div className="paragraph">
          <p>
            Explorez notre Pokédex complet pour découvrir chaque Pokémon :
            types, statistiques, évolutions… toutes les informations pour
            devenir incollable !
          </p>
          <br />
          <p>
            Prêt pour le combat ? Choisissez votre Pokémon favori et lancez-vous
            dans des tournois épiques et personnalisés dans notre arène !
          </p>
        </div>
        <button type="button">button</button>
        <button type="button">button</button>
      </div>
      <footer>
        Made with <span className="heart">❤</span> by Justine, Florentin, Rémi
        et Julien
      </footer>
    </div>
  );
}
