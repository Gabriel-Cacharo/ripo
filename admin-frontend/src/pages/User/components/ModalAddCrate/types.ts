export interface IAllCrates {
  id: number;
  name: string;
  type: string;
  price: string;
  rarity: number;
  canDropRipo: boolean;
  riposDrop: string | [];
  canDropItems: boolean;
  itemsDrop: string | [];
  crateImage: string;
  updatedAt: string;
  createdAt: string;
}
