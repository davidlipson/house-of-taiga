import { Control, Controller, useForm } from "react-hook-form";
import { Radios } from "../../../blocks";
import { Group } from "./Group";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFields, uploadSchema } from "../schema";

export const TotalSquares = ({
  control,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
}) => {
  const [customSelected, setCustomSelected] = useState(false);

  return (
    <Group>
      <Controller
        control={control}
        name={UploadFields.SQUARES}
        render={({ field, fieldState }) => {
          console.log(fieldState);
          return (
            <Radios
              value={field.value}
              options={[
                {
                  label: "Fat Quarter",
                  value: 12,
                },
                {
                  label: "Half Yard",
                  value: 24,
                },
                {
                  label: "Full Yard",
                  value: 56,
                },
                {
                  label: "Custom",
                  value: 0,
                },
              ]}
              onChange={(value) => {
                field.onChange(value);
                setCustomSelected(value === 0);
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          );
        }}
      />
    </Group>
  );
};
