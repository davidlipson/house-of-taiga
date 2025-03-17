import { existingBrands } from "./brand";
import { existingTags } from "./tags";

export type InventoryItem = {
  id: string;
  name: string;
  brand: string;
  image?: File;
  price: number;
  tags?: string[];
  quantity: number;
};

export const existingInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Product 1",
    brand: existingBrands[0],
    price: 100.75,
    tags: [...existingTags, ...existingTags],
    quantity: 10,
  },
  {
    id: "1",
    name: "Product 2",
    brand: existingBrands[1],
    tags: existingTags.reverse(),
    price: 50.25,
    quantity: 0,
  },
];
