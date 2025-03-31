import { Colour } from "../components";
import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "./helpers/response";
import { fetcher } from "./helpers/util";
import { Brand } from "./brand";
import { Bin } from "./bins";
import { Tag } from "./tags";

export type InventoryItem = {
  id: string;
  name: string;
  brand: Brand;
  bin: Bin;
  //image?: File;
  colour: string;
  cost: number;
  tags: Tag[];
  quantity: number;
};

export enum InventoryKey {
  BASE = "INVENTORY",
}

export const useInventory = ({
  tags,
  query,
  searching,
}: {
  tags?: string[];
  query?: string;
  searching: boolean;
}) => {
  return useQuery<GetAllResponse<InventoryItem>>({
    enabled: searching,
    queryKey: [InventoryKey.BASE, tags, query],
    queryFn: () =>
      fetcher("inventory", {
        params: { tags, query },
      }),
  });
};
