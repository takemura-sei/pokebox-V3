export type defaultPokemonListType = { name: string, url: string, id?: string, type1?: string, type2?: string }[];

export type PokemonListType = { name: string, url: string }[];

export type FilterListType = { type: string, id: number }[];

export type DisplayDataType = {
  [name: string]: string;
};

export type LanguageNameObjType = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

export type PokemonTypesObjType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};