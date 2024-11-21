export interface Data {
  id?: number;
  type?: string[];
  height?: number;
  weight?: number;
  cry?: string;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };
  img?: string;
  imgShiny?: string;
  name?: string;
  category?: string;
  description?: string;
  generation?: string;
  baseForm?: {
    name?: string;
    url?: string;
  } | null;
}

export interface GetPokemon {
  id: number;
  types: string[];
  height: number;
  weight: number;
  cry: string;
  stats: {
    attack: number;
    defense: number;
    hp: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  img: string;
  imgShiny: string;
}

export interface GetPokemonSpecies {
  name: Names[];
  category: Categories[];
  description: Descriptions[];
  generation: string;
  baseForm: {
    name: string;
    url: string;
  } | null;
}

export interface PokemonMiniatureProps {
  id?: number;
  img?: string;
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Localizations {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Descriptions {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface Names {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Categories {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonNavSpecificationsProps {
  description?: string;
  height?: number;
  weight?: number;
  handleClickPlayCry: () => void;
  cryIcon: string;
}

export interface PokemonNavStatsProps {
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };
}
