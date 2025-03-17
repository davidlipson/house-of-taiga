import { Control, Controller } from "react-hook-form";
import { ColourWheel, Input, Radios } from "../../../blocks";
import { Group } from "./Group";
import React from "react";
import { z } from "zod";
import { UploadFields, uploadSchema } from "../schema";

export const SelectColour = ({
  control,
  isMultiColour,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
  isMultiColour: boolean;
}) => {
  return (
    <Group label="Colour">
      <Controller
        control={control}
        name={UploadFields.IS_MULTI_COLOUR}
        render={({ field, fieldState }) => (
          <>
            <Radios
              value={field.value}
              options={[
                {
                  label: "Multi-coloured",
                  value: true,
                },
                {
                  label: "Specific Colour",
                  value: false,
                },
              ]}
              onChange={(value) => {
                field.onChange(value === "true");
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </>
        )}
      />
      {isMultiColour === false && (
        <Controller
          control={control}
          name={UploadFields.COLOUR}
          render={({ field, fieldState }) => (
            <ColourWheel
              value={field.value}
              onChange={(colour) => {
                field.onChange(colour);
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    </Group>
  );
};
