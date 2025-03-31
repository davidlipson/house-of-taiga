import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "./helpers/response";
import { fetcher } from "./helpers/util";

export enum BrandsKey {
  BASE = "BRANDS",
}

export type Brand = {
  id: string;
  name: string;
};

export const useBrands = () => {
  return useQuery<GetAllResponse<Brand>>({
    queryKey: [BrandsKey.BASE],
    queryFn: () => fetcher("brand", { params: {} }),
  });
};
