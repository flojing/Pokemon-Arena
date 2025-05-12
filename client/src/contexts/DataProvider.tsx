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
      const pokemonArray: Data[] = [];
      try {
        // 1. Récupérer la liste des Pokémon
        const allPokemon = await getAllPokemon(0, 898);
        const totalPokemon = allPokemon.results.length;

        // 2. Définir la taille du lot (combien de requêtes parallèles à la fois)
        const batchSize = 10;

        // 3. Diviser les résultats en lots
        const batches = [];
        for (let i = 0; i < allPokemon.results.length; i += batchSize) {
          batches.push(allPokemon.results.slice(i, i + batchSize));
        }

        let processedCount = 0;

        // 4. Traiter chaque lot de manière séquentielle
        for (const batch of batches) {
          // 5. Traiter les Pokémon dans le lot en parallèle
          const batchPromises = batch.map(async (pokemon: { url: string }) => {
            // Extraire l'ID à partir de l'URL
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

            try {
              // Requêtes en parallèle pour chaque Pokémon
              const [pokemonBase, pokemonSpecies] = await Promise.all([
                getPokemon(id),
                getPokemonSpecies(id),
              ]);

              const { types, height, weight, cry, stats, img, imgShiny } =
                pokemonBase as GetPokemon;

              const { name, category, description, generation, baseForm } =
                pokemonSpecies as GetPokemonSpecies;

              return {
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
              };
            } catch (error) {
              console.error(
                `Erreur lors du chargement du Pokémon ${id}:`,
                error,
              );
              return null; // Retourner null en cas d'erreur pour le filtrer plus tard
            }
          });

          // 6. Attendre que toutes les requêtes du lot soient terminées
          const batchResults = await Promise.allSettled(batchPromises);

          // 7. Traiter les résultats et mettre à jour le tableau
          for (const result of batchResults) {
            if (result.status === "fulfilled" && result.value !== null) {
              pokemonArray.push(result.value);
            }
            // Mettre à jour la progression même pour les requêtes échouées
            processedCount++;
            setProgress(Math.round((processedCount / totalPokemon) * 100));
          }

          // 8. Mettre à jour les données partielles après chaque lot
          // Cela permet d'afficher progressivement les Pokémon au fur et à mesure
          setData([...pokemonArray]);
        }
      } catch (error) {
        console.error("Erreur générale:", error);
      }
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
    throw new Error(
      "useData doit être utilisé à l'intérieur d'un DataProvider",
    );
  }

  return value;
};
