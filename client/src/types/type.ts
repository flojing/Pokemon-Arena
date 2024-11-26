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
  name?: string;
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

export interface PokemonBattleCardProps {
  id?: number;
  name?: string;
  img?: string;
  isWinner: boolean;
  imgShiny?: string;
}

export interface PokedexDetailsProps {
  idBattle?: number | null;
  isBattle?: boolean;
}

export interface Context {
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  match: number;
  setMatch: React.Dispatch<React.SetStateAction<number>>;
  randomPokemon: Data[][];
  setRandomPokemon: React.Dispatch<React.SetStateAction<Data[][]>>;
  matchWinner: Data[];
  setMatchWinner: React.Dispatch<React.SetStateAction<Data[]>>;
  isBaseForm: boolean;
  setIsBaseForm: React.Dispatch<React.SetStateAction<boolean>>;
  isShinyBattle: boolean;
  setIsShinyBattle: React.Dispatch<React.SetStateAction<boolean>>;
  generationName: string[];
  setGenerationName: React.Dispatch<React.SetStateAction<string[]>>;
  typeName: string[];
  setTypeName: React.Dispatch<React.SetStateAction<string[]>>;
  reset: () => void;
}

export interface Background {
  background: string;
  border: string;
  color: string;
}

export interface TypeColor {
  [key: string]: Background;
  normal: Background;
  fire: Background;
  water: Background;
  electric: Background;
  grass: Background;
  ice: Background;
  fighting: Background;
  poison: Background;
  ground: Background;
  flying: Background;
  psychic: Background;
  bug: Background;
  rock: Background;
  ghost: Background;
  dragon: Background;
  dark: Background;
  steel: Background;
  fairy: Background;
  winner: Background;
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

export interface StatsBarProps {
  statCategory?: number;
  statKey?: string;
}

export interface GenerationTypeFilterProps {
  array: string[];
  name: string;
}

export interface TypeTranslation {
  [key: string]: string;
  Plante: string;
  Poison: string;
  Feu: string;
  Vol: string;
  Eau: string;
  Insecte: string;
  Normal: string;
  Électrik: string;
  Sol: string;
  Fée: string;
  Combat: string;
  Psy: string;
  Roche: string;
  Acier: string;
  Glace: string;
  Spectre: string;
  Dragon: string;
  Ténèbres: string;
}
