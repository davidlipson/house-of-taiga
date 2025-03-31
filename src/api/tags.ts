import { useQuery } from "@tanstack/react-query";
import { GetAllResponse } from "./helpers/response";
import { fetcher } from "./helpers/util";

export enum TagsKey {
  BASE = "TAGS",
}

export type Tag = {
  id: string;
  name: string;
};

export const useTags = () => {
  return useQuery<GetAllResponse<Tag>>({
    queryKey: [TagsKey.BASE],
    queryFn: () => fetcher("tag", { params: {} }),
  });
};
