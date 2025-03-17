import { z } from "zod";

export enum UploadFields {
  NAME = "name",
  CUSTOM_SQUARES = "custom_squares",
  SQUARES = "squares",
  TAGS = "tags",
  IMAGE = "image",
  COST = "cost",
  // colours
  COLOUR = "colour",
}

export const colourSchema = z.object({
  h: z.number(),
  s: z.number(),
  v: z.number(),
  a: z.number(),
});

export const uploadSchema = z
  .object({
    [UploadFields.NAME]: z.string().min(1),
    [UploadFields.SQUARES]: z.number(),
    [UploadFields.CUSTOM_SQUARES]: z.number().min(1).optional(),
    [UploadFields.TAGS]: z.array(z.string()).min(1),
    [UploadFields.IMAGE]: z.instanceof(File),
    [UploadFields.COST]: z.number().gt(0),
    [UploadFields.COLOUR]: colourSchema,
  })
  .refine(
    (data) =>
      data[UploadFields.SQUARES] !== 0 ||
      (data[UploadFields.CUSTOM_SQUARES] !== undefined &&
        data[UploadFields.CUSTOM_SQUARES] > 0),
    {
      path: [UploadFields.CUSTOM_SQUARES],
      message: "Custom squares is required",
    }
  );
