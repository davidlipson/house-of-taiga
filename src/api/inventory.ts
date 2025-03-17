import { Colour } from "../components";
import { existingBrands } from "./brand";
import { existingShelves } from "./shelves";
import { existingTags } from "./tags";
import { faker } from "@faker-js/faker";

export type InventoryItem = {
  id: string;
  name: string;
  brand: string;
  shelf: string;
  image?: File;
  colour?: Colour;
  cost: number;
  tags?: string[];
  quantity: number;
};

const fakeItem = (): InventoryItem => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  brand: faker.helpers.arrayElement(existingBrands),
  shelf: faker.helpers.arrayElement(existingShelves),
  cost: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
  quantity: faker.number.int({ min: 0, max: 100 }),
  tags: faker.helpers.arrayElements(existingTags, { min: 1, max: 10 }),
  colour: {
    h: faker.number.int({ min: 0, max: 360 }),
    s: faker.number.int({ min: 0, max: 100 }),
    v: faker.number.int({ min: 0, max: 100 }),
    a: faker.number.int({ min: 0, max: 100 }),
  },
});

export const existingInventory: InventoryItem[] = faker.helpers.multiple(
  fakeItem,
  {
    count: 25,
  }
);
