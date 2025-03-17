import { Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Dropdown, Input, UploadImage } from "../../blocks";
import { colours } from "../../../styles";
import { Group } from "./components/Group";
import { UploadFields, uploadSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTags } from "./components/AddTags";
import { TotalSquares } from "./components/TotalSquares";
import { SelectBrand } from "./components/SelectBrand";
import { SelectColour } from "./components/SelectColour";

export const Form = ({
  defaultValues,
  onSubmit,
  isEditing,
}: {
  defaultValues?: z.infer<typeof uploadSchema>;
  onSubmit?: (data: z.infer<typeof uploadSchema>) => void;
  isEditing?: boolean;
}) => {
  const { control, handleSubmit, watch } = useForm<
    z.infer<typeof uploadSchema>
  >({
    resolver: zodResolver(uploadSchema),
    defaultValues: defaultValues || {
      [UploadFields.COLOUR]: {
        h: 214,
        s: 43,
        v: 90,
        a: 1,
      },
      [UploadFields.BRAND]: "",
      [UploadFields.NAME]: "",
      [UploadFields.TAGS]: [],
      [UploadFields.IMAGE]: undefined,
    },
  });
  const squares = watch(UploadFields.SQUARES);
  const isMultiColour = watch(UploadFields.IS_MULTI_COLOUR);
  const tags = watch(UploadFields.TAGS);
  const brand = watch(UploadFields.BRAND);
  /*const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    // TODO: if this already exists in DB, notify frontend that
    // we're just going to update the quantity but not add a new item
    completeSubmission(data);
    console.log(data);
  };*/

  return (
    <Stack
      spacing={5}
      sx={{
        backgroundColor: colours.white,
        display: "flex",
        padding: "24px",
        borderRadius: "8px",
        border: `1px solid ${colours.grey}`,
        width: "400px",
        marginBottom: "40px",
        ...(isEditing && {
          height: "500px",
          overflow: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }),
      }}
    >
      <Stack spacing={3}>
        <Controller
          control={control}
          name={UploadFields.IMAGE}
          render={({ field, fieldState }) => (
            <UploadImage
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              helperText={"Upload an image of the pattern"}
            />
          )}
        />
        <Stack spacing={2}>
          <SelectBrand control={control} value={brand} />
          <Group label="Name">
            <Controller
              control={control}
              name={UploadFields.NAME}
              render={({ field, fieldState }) => (
                <Input
                  placeholder="What's the name of this pattern?"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Group>
        </Stack>
        <TotalSquares control={control} value={squares} />
        <Group label="Cost">
          <Controller
            control={control}
            name={UploadFields.COST}
            render={({ field, fieldState }) => (
              <Input
                placeholder="How much did the fabric cost?"
                onChange={(value) => field.onChange(parseFloat(value))}
                value={field.value}
                type="currency"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Group>
        <SelectColour control={control} isMultiColour={isMultiColour} />
        <AddTags control={control} value={tags} />
      </Stack>
      <Stack spacing={1}>
        {isEditing && (
          <Typography
            width={1}
            textAlign="center"
            variant="caption"
            color={colours.black}
          >
            Note: this will edit an existing item in your inventory
          </Typography>
        )}
        <Button
          text={isEditing ? "Update inventory" : "Add to inventory"}
          onClick={handleSubmit(onSubmit || (() => {}))}
        />
      </Stack>
    </Stack>
  );
};
