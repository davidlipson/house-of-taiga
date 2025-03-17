import { Grid2, Stack } from "@mui/material";
import { Input } from "../../../blocks/Input";
import { Tag } from "../../../blocks/Tag";
import React, { useState } from "react";
import { Group } from "./Group";
import { Control, Controller } from "react-hook-form";
import { UploadFields, uploadSchema } from "../schema";
import { z } from "zod";
import { Dropdown, ErrorText } from "../../../blocks";
import { existingBrands, existingTags } from "../../../../api";

export const SelectBrand = ({
  control,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
}) => {
  const [currentBrand, setCurrentBrand] = useState<string | null>(null);
  const [suggestedBrands] = useState<string[]>(existingBrands);
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
                const withoutWhitespace = value?.trim() ?? null;
                setCurrentBrand(withoutWhitespace);
                field.onChange(withoutWhitespace);
              }}
              value={currentBrand}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          </Group>
        )}
      />
    </Stack>
  );
};
