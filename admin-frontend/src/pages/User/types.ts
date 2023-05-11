export interface IUser {
  user: {
    fac: string;
    facRipos: string;
    id: number;
    instagram: string;
    ripoId: number;
    twitch: string;
    username: string;
    xp: string;
    coins: string;
  };
  ripos: IRipo[];
  facRipos: IRipo[];
  profileRipo: string;
  favoriteCar: number;
  favoriteGun: number;
  favoriteSecondaryGun: number;
  guns: string;
  cars: string;
  quantityTotalRiposPublic: number;
}

interface IRipo {
  id: number;
  createdAt: string;
  updatedAt: string;
  price: string;
  public: boolean;
  name: string;
  rarity: number;
  ripoImage: string;
}
