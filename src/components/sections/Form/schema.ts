import { z } from "zod";

export enum UploadFields {
  BRAND = "brand",
  NAME = "name",
  CUSTOM_SQUARES = "custom_squares",
  SQUARES = "squares",
  TAGS = "tags",
  IMAGE = "image",
  COST = "cost",
  // colours
  IS_MULTI_COLOUR = "is_multi_colour",
  COLOUR = "colour",
}

export const colourSchema = z.object({
  h: z.number(),
  s: z.number(),
  v: z.number(),
  a: z.number(),
});

export type Colour = z.infer<typeof colourSchema>;

export const uploadSchema = z
  .object({
    [UploadFields.NAME]: z.string().min(1),
    [UploadFields.BRAND]: z.string().min(1),
    [UploadFields.SQUARES]: z.number(),
    [UploadFields.CUSTOM_SQUARES]: z.number().gte(0).optional(),
    [UploadFields.TAGS]: z.array(z.string()).min(1),
    [UploadFields.IMAGE]: z.instanceof(File),
    [UploadFields.COST]: z.number().gte(0),
    [UploadFields.COLOUR]: colourSchema,
    [UploadFields.IS_MULTI_COLOUR]: z.boolean(),
  })
  .refine(
    (data) =>
      data[UploadFields.SQUARES] !== 0 ||
      (data[UploadFields.CUSTOM_SQUARES] !== undefined &&
        data[UploadFields.CUSTOM_SQUARES] >= 0),
    {
      path: [UploadFields.CUSTOM_SQUARES],
      message: "Custom squares is required",
    }
  )
  .refine(
    (data) =>
      data[UploadFields.IS_MULTI_COLOUR] === true ||
      data[UploadFields.COLOUR] !== undefined,
    {
      path: [UploadFields.COLOUR],
      message: "Colour is required",
    }
  );
