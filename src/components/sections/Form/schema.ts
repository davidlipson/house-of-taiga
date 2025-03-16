import { z } from "zod";

export enum UploadFields {
  NAME = "name",
  SQUARES = "squares",
  TAGS = "tags",
  IMAGE = "image",
  COST = "cost",
  // colours
}

export const uploadSchema = z.object({
  [UploadFields.NAME]: z.string().min(1),
  [UploadFields.SQUARES]: z.number().min(1),
  [UploadFields.TAGS]: z.array(z.string()),
  //[UploadFields.IMAGE]: z.instanceof(File),
  [UploadFields.COST]: z.number().gt(0),
});
