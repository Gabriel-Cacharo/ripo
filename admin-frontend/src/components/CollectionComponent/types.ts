export interface ICollectionComponent {
  id: number;
  image: string;
  name: string;
  rarity: number | string;
  price: number;
  functionRemove: (userId: number | string) => void;
  type?: string;
  crateType?: string;
}
