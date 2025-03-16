import { Stack } from "@mui/material";
import React from "react";
import { Button, Input, UploadImage } from "../../blocks";
import { colours } from "../../../styles";
import { Group } from "./components/Group";
import { UploadFields, uploadSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTags } from "./components/AddTags";
import { TotalSquares } from "./components/TotalSquares";

const formStyle = {
  display: "flex",
  padding: "24px",
  borderRadius: "8px",
  border: `1px solid ${colours.grey}`,
  width: "400px",
};

export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    console.log(data);
  };
  return (
    <Stack spacing={3} sx={formStyle}>
      <UploadImage />
      <Group label="Name">
        <Controller
          control={control}
          name={UploadFields.NAME}
          render={({ field, fieldState }) => (
            <Input
              placeholder="What do you want to call this pattern?"
              onChange={field.onChange}
              value={field.value}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Group>
      <TotalSquares control={control} />
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
      <AddTags />
      <Button text="Add to inventory" onClick={handleSubmit(onSubmit)} />
    </Stack>
  );
};
