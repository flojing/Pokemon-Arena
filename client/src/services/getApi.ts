import type {
  Categories,
  Descriptions,
  Localizations,
  Names,
  Stats,
  Types,
} from "../types/type";

export const getAllPokemon = async (num: number) => {
  try {
    const allPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${num}`,
    );
    const data = await allPokemon.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPokemon = async (url: string) => {
  try {
    const pokemon = await fetch(url);
    const data = await pokemon.json();
    return {
      id: data.id,
      types: data.types.map((element: Types) => element.type.url),
      height: data.height / 10,
      weight: data.weight / 10,
      cry: data.cries.latest,
      stats: {
        hp: data.stats.find((element: Stats) => element.stat.name === "hp")
          .base_stat,
        attack: data.stats.find(
          (element: Stats) => element.stat.name === "attack",
        ).base_stat,
        defense: data.stats.find(
          (element: Stats) => element.stat.name === "defense",
        ).base_stat,
        specialAttack: data.stats.find(
          (element: Stats) => element.stat.name === "special-attack",
        ).base_stat,
        specialDefense: data.stats.find(
          (element: Stats) => element.stat.name === "special-defense",
        ).base_stat,
        speed: data.stats.find(
          (element: Stats) => element.stat.name === "speed",
        ).base_stat,
      },
      img: data.sprites.other["official-artwork"].front_default,
      imgShiny: data.sprites.other["official-artwork"].front_shiny,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonSpecies = async (id: number) => {
  try {
    const pokemonSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const data = await pokemonSpecies.json();
    return {
      name: data.names,
      category: data.genera,
      description: data.flavor_text_entries,
      generation: data.generation.url,
      baseForm: data.evolves_from_species,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonTypesTranslation = async (
  url: string,
  language: string,
) => {
  try {
    const pokemonTranslation = await fetch(url);
    const data = await pokemonTranslation.json();
    return data.names.find(
      (element: Localizations) => element.language.name === language,
    ).name;
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonDescritpionTranslation = (
  data: Descriptions[],
  language: string,
) => {
  return data.find(
    (element: Descriptions) => element.language.name === language,
  )?.flavor_text;
};

export const getPokemonNameTranslation = (data: Names[], language: string) => {
  return data.find((element: Names) => element.language.name === language)
    ?.name;
};

export const getPokemonCategoryTranslation = (
  data: Categories[],
  language: string,
) => {
  return data.find((element: Categories) => element.language.name === language)
    ?.genus;
};
