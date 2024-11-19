// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import "./main.css";
import BattleSettingsProvider from "./context/BattleSettingsProvider";
import Battle from "./pages/Battle";
import BattleSettings from "./pages/BattleSettings";
import Home from "./pages/Home";
import PokedexDetails from "./pages/PokedexDetails";
import PokedexSearch from "./pages/PokedexSearch";
import {
  getAllPokemon,
  getPokemon,
  getPokemonCategoryTranslation,
  getPokemonDescritpionTranslation,
  getPokemonNameTranslation,
  getPokemonSpecies,
  getPokemonTypesTranslation,
} from "./services/getApi";
import type { GetPokemon, GetPokemonSpecies } from "./types/type";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const getData = async () => {
  const language = "fr";
  const pokemonArray = [];
  try {
    const allPokemon = await getAllPokemon(151);
    for (const pokemon of allPokemon.results) {
      const { id, types, height, weight, cry, stats, img, imgShiny } =
        (await getPokemon(pokemon.url)) as GetPokemon;

      const { name, category, description, generation, baseForm } =
        (await getPokemonSpecies(id)) as GetPokemonSpecies;

      const typeName = [];

      for (const url of types) {
        const translatedType = await getPokemonTypesTranslation(url, language);
        typeName.push(translatedType);
      }

      pokemonArray.push({
        id: id,
        type: typeName,
        height: height,
        weight: weight,
        cry: cry,
        stats: stats,
        img: img,
        imgShiny: imgShiny,
        name: getPokemonNameTranslation(name, language),
        category: getPokemonCategoryTranslation(category, language),
        description: getPokemonDescritpionTranslation(description, language),
        generation: generation
          .split("")
          .filter((_, index) => index === 37)
          .join(""),
        baseForm: baseForm,
      });
    }
  } catch (error) {
    console.error(error);
  }
  return pokemonArray;
};

const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    loader: () => {
      return getData();
    },
    id: "data",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokedex",
        element: <PokedexSearch />,
      },
      {
        path: "/battle-settings",
        element: <BattleSettings />,
      },
      {
        path: "/battle",
        element: <Battle />,
      },
      {
        path: "/pokedex/:id",
        element: <PokedexDetails idBattle={null} isBattle={false} />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <BattleSettingsProvider>
      <RouterProvider router={router} />
    </BattleSettingsProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
