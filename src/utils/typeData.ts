// src/utils/typeData.ts

import normalIcon from '@/assets/images/icon_type_1.svg';
import grassIcon from '@/assets/images/icon_type_4.svg';
import fireIcon from '@/assets/images/icon_type_2.svg';
import waterIcon from '@/assets/images/icon_type_3.svg';
import darkIcon from '@/assets/images/icon_type_16.svg';
import bugIcon from '@/assets/images/icon_type_12.svg';
import dragonIcon from '@/assets/images/icon_type_15.svg';
import electricIcon from '@/assets/images/icon_type_5.svg';
import fairyIcon from '@/assets/images/icon_type_18.svg';
import fightingIcon from '@/assets/images/icon_type_7.svg';
import flyingIcon from '@/assets/images/icon_type_10.svg';
import ghostIcon from '@/assets/images/icon_type_14.svg';
import groundIcon from '@/assets/images/icon_type_9.svg';
import iceIcon from '@/assets/images/icon_type_6.svg';
import poisonIcon from '@/assets/images/icon_type_8.svg';
import psychicIcon from '@/assets/images/icon_type_11.svg';
import rockIcon from '@/assets/images/icon_type_13.svg';
import steelIcon from '@/assets/images/icon_type_17.svg';

export const typeList = [
  { type: "normal", id: 1 },
  { type: "grass", id: 2 },
  { type: "fire", id: 3},
  { type: "water", id: 4 },
  { type: "dark", id: 5},
  { type: "bug", id: 6},
  { type: "dragon", id: 7 },
  { type: "electric", id: 8 },
  { type: "fairy", id: 9 },
  { type: "fighting", id: 10 },
  { type: "flying", id: 11 },
  { type: "ghost", id: 12 },
  { type: "ground", id: 13 },
  { type: "ice", id: 14 },
  { type: "poison", id: 15 },
  { type: "psychic", id: 16 },
  { type: "rock", id: 17 },
  { type: "steel", id: 18 },
];

export const typeJpName = {
  normal: "ノーマル",
  grass: "くさ",
  fire: "ほのお",
  water: "みず",
  dark: "あく",
  bug: "むし",
  dragon: "ドラゴン",
  electric: "でんき",
  fairy: "フェアリー",
  fighting: "かくとう",
  flying: "ひこう",
  ghost: "ゴースト",
  ground: "じめん",
  ice: "こおり",
  poison: "どく",
  psychic: "エスパー",
  rock: "いわ",
  steel: "はがね",
};

export const typeImage = {
  normal: normalIcon,
  grass: grassIcon,
  fire: fireIcon,
  water: waterIcon,
  dark: darkIcon,
  bug: bugIcon,
  dragon: dragonIcon,
  electric: electricIcon,
  fairy: fairyIcon,
  fighting: fightingIcon,
  flying: flyingIcon,
  ghost: ghostIcon,
  ground: groundIcon,
  ice: iceIcon,
  poison: poisonIcon,
  psychic: psychicIcon,
  rock: rockIcon,
  steel: steelIcon,
};
