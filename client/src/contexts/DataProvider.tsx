import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAllPokemon,
  getPokemon,
  getPokemonCategoryTranslation,
  getPokemonDescritpionTranslation,
  getPokemonNameTranslation,
  getPokemonSpecies,
} from "../services/getApi";
import type {
  Data,
  DataContextType,
  GetPokemon,
  GetPokemonSpecies,
} from "../types/type";

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data[] | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const language = "fr";
      const pokemonArray = [];
      try {
        const allPokemon = await getAllPokemon(0, 898);
        const totalPokemon = allPokemon.results.length;
        let i = 0;

        for (const pokemon of allPokemon.results) {
          const id = Number(
            pokemon.url
              .split("")
              .filter((_: string, index: number) => {
                if (pokemon.url.length === 36) {
                  return index === 34;
                }
                if (pokemon.url.length === 37) {
                  return index === 34 || index === 35;
                }
                if (pokemon.url.length === 38) {
                  return index === 34 || index === 35 || index === 36;
                }
              })
              .join(""),
          );

          const [pokemonBase, pokemonSpecies] = await Promise.all([
            getPokemon(id),
            getPokemonSpecies(id),
          ]);

          const { types, height, weight, cry, stats, img, imgShiny } =
            pokemonBase as GetPokemon;

          const { name, category, description, generation, baseForm } =
            pokemonSpecies as GetPokemonSpecies;

          pokemonArray.push({
            id: id,
            type: types,
            height: height,
            weight: weight,
            cry: cry,
            stats: stats,
            img: img,
            imgShiny: imgShiny,
            name: getPokemonNameTranslation(name, language),
            category: getPokemonCategoryTranslation(category, language),
            description: getPokemonDescritpionTranslation(
              description,
              language,
            ),
            generation: generation
              .split("")
              .filter((_, index) => index === 37)
              .join(""),
            baseForm: baseForm,
          });
          setProgress(Math.round(((i + 1) / totalPokemon) * 100));
          i++;
        }
      } catch (error) {
        console.error(error);
      }
      setData(pokemonArray);
    };
    getData();
  }, []);
  return (
    <DataContext.Provider value={{ data, progress }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const value = useContext(DataContext);

  if (value == null) {
    throw new Error("You suck bruh");
  }

  return value;
};
