import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "./helpers/response";
import { fetcher } from "./helpers/util";

export enum BinsKey {
  BASE = "BINS",
}

export type Bin = {
  id: string;
  name: string;
};

export const useBins = () => {
  return useQuery<GetAllResponse<Bin>>({
    queryKey: [BinsKey.BASE],
    queryFn: () => fetcher("bin", { params: {} }),
  });
};
