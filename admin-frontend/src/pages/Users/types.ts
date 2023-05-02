export interface IUser {
  id: number;
  username: string;
  facName: string;
  xp: string;
  coins: string;
  ripoId: {
    id: number;
    ripoImage: string;
    public: boolean | null;
    rarity: number;
    name: string;
  };
}

export interface ISearch {
  ripoId: string;
  username: string;
}
