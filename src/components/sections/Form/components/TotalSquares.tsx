import { Control, Controller } from "react-hook-form";
import { Input, Radios } from "../../../blocks";
import { Group } from "./Group";
import React from "react";
import { z } from "zod";
import { UploadFields, uploadSchema } from "../schema";

export const TotalSquares = ({
  control,
  value,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
  value: number;
}) => {
  return (
    <Group label="Square Count">
      <Controller
        control={control}
        name={UploadFields.SQUARES}
        render={({ field, fieldState }) => (
          <>
            <Radios
              value={field.value}
              options={[
                {
                  label: "Fat Quarter",
                  value: 12,
                  description: "12 squares",
                },
                {
                  label: "Half Yard",
                  value: 24,
                  description: "24 squares",
                },
                {
                  label: "Full Yard",
                  value: 56,
                  description: "56 squares",
                },
                {
                  label: "Custom",
                  value: 0,
                },
              ]}
              onChange={(value) => {
                field.onChange(Number(value));
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </>
        )}
      />
      {value === 0 && (
        <Controller
          control={control}
          name={UploadFields.CUSTOM_SQUARES}
          render={({ field, fieldState }) => (
            <Input
              placeholder="Enter the number of squares"
              type="number"
              onChange={(value) => {
                field.onChange(Number(value));
              }}
              value={field.value || 0}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    </Group>
  );
};
