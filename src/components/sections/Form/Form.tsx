import { Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
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
  const [submittingWithZero, setSubmittingWithZero] = useState<
    z.infer<typeof uploadSchema> | undefined
  >();
  console.log(submittingWithZero);
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
      [UploadFields.CUSTOM_SQUARES]: 0,
      [UploadFields.BRAND]: "",
      [UploadFields.NAME]: "",
      [UploadFields.TAGS]: [],
      [UploadFields.IMAGE]: undefined,
    },
  });
  const squares = watch(UploadFields.SQUARES);
  const customSquares = watch(UploadFields.CUSTOM_SQUARES);
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
    <>
      <Modal
        open={!!submittingWithZero}
        onClose={() => setSubmittingWithZero(undefined)}
      >
        <Stack
          spacing={5}
          sx={{
            backgroundColor: colours.white,
            display: "flex",
            padding: "24px",
            width: "400px",
            marginBottom: "40px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={1}
        >
          <Stack spacing={2}>
            <Typography fontWeight={300} fontSize="16px" color={colours.black}>
              You're trying to {isEditing ? "update" : "add"} an item to have 0
              squares. Are you sure you want to do this?
            </Typography>
            {isEditing && (
              <Typography
                fontWeight={600}
                fontSize="14px"
                color={colours.black}
              >
                This will reset the quantity of the item to 0 in your inventory.
              </Typography>
            )}
          </Stack>
          <Stack
            width={1}
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              text={`Yes, ${isEditing ? "reset stock" : "continue"}`}
              onClick={() => {
                onSubmit && submittingWithZero && onSubmit(submittingWithZero);
                setSubmittingWithZero(undefined);
              }}
            />
            <Button
              text="No, cancel"
              onClick={() => setSubmittingWithZero(undefined)}
            />
          </Stack>
        </Stack>
      </Modal>
      <Stack
        spacing={5}
        sx={{
          backgroundColor: colours.white,
          display: "flex",
          borderRadius: "12px",
          border: `1px solid ${colours.grey}`,
          padding: "24px",
          width: "400px",
          marginBottom: "40px",
          ...(isEditing && {
            height: "500px",
            overflow: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "0px",
            border: "none",
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
            onClick={handleSubmit((form: z.infer<typeof uploadSchema>) => {
              if (squares === 0 && customSquares === 0) {
                setSubmittingWithZero(form);
              } else {
                onSubmit && onSubmit(form);
              }
            })}
          />
        </Stack>
      </Stack>
    </>
  );
};
