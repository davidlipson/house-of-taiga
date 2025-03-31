import { Stack } from "@mui/material";
import React, { useState } from "react";
import { Group } from "./Group";
import { Control, Controller } from "react-hook-form";
import { UploadFields, uploadSchema } from "../schema";
import { z } from "zod";
import { Dropdown } from "../../../blocks";
import { useBrands } from "../../../../api";

export const SelectBrand = ({
  control,
  value,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
  value: string;
}) => {
  const { data: brands } = useBrands();
  console.log(brands);
  const [suggestedBrands] = useState<string[]>([]);
  return (
    <Stack spacing={1}>
      <Controller
        control={control}
        name={UploadFields.BRAND}
        render={({ field, fieldState }) => (
          <Group label="Brand">
            <Dropdown
              options={suggestedBrands}
              placeholder="Select a brand or add a new one"
              onChange={(value) => {
                const withoutWhitespace =
                  typeof value === "string" ? value.trim() : null;
                field.onChange(withoutWhitespace);
              }}
              value={value}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </Group>
        )}
      />
    </Stack>
  );
};
