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
