import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllResponse } from "./helpers/response";
import { fetcher, poster } from "./helpers/util";
import { Brand } from "./brand";
import { Bin } from "./bins";
import { Tag } from "./tags";
import { Colour } from "../components/sections/Form/schema";

export type CreateInventoryItem = {
  name: string;
  brand: string;
  colour?: Colour;
  cost: number;
  tags: string[];
  quantity: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  brand: Brand;
  bin: Bin;
  //image?: File;
  colour?: Colour;
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

export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CreateInventoryItem) =>
      poster(
        "inventory",
        {
          arg: item,
        },
        "post"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [InventoryKey.BASE] });
    },
  });
};

export const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      poster(`inventory/${id}`, { arg: {} }, "delete"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [InventoryKey.BASE] });
    },
  });
};

export const useUpdateInventoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: CreateInventoryItem }) =>
      poster(`inventory/${id}`, { arg: item }, "put"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [InventoryKey.BASE] });
    },
  });
};
