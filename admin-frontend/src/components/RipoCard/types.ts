export interface IRipo {
  id: number;
  name: string;
  price: string;
  public: boolean;
  rarity: number;
  ripoImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRipoCard {
  ripo: IRipo;
  setModalEditRipoIsOpen: (arg0: boolean) => void;
  setRipoSelected: (arg0: IRipo) => void;
}
