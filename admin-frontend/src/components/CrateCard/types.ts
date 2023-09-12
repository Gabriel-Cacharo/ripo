export interface ICrate {
  id: number;
  name: string;
  price: string;
  rarity: number;
  crateImage: string;
  canDropItems: boolean;
  canDropRipo: boolean;
  riposDrop: string;
  itemsDrop: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICrateCard {
  crate: ICrate;
  setModalEditCrateIsOpen: (arg0: boolean) => void;
  setCrateSelected: (arg0: ICrate) => void;
}
