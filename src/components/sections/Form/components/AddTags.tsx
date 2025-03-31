import { Grid2, Stack } from "@mui/material";
import { Input } from "../../../blocks/Input";
import { Tag } from "../../../blocks/Tag";
import React, { useState } from "react";
import { Group } from "./Group";
import { Control, Controller } from "react-hook-form";
import { UploadFields, uploadSchema } from "../schema";
import { z } from "zod";
import { ErrorText } from "../../../blocks";
import { useTags } from "../../../../api";

export const AddTags = ({
  value,
  control,
}: {
  value: string[];
  control: Control<z.infer<typeof uploadSchema>>;
}) => {
  const [currentTag, setCurrentTag] = useState<string>("");
  const { data: suggestedTags } = useTags();
  const allUniqueTags = [
    ...new Set([...value, ...(suggestedTags?.map((tag) => tag.name) || [])]),
  ];
  return (
    <Group label="Tags">
      <Stack spacing={1}>
        <Controller
          control={control}
          name={UploadFields.TAGS}
          render={({ field, fieldState }) => (
            <>
              <Input
                placeholder="Press enter to add new tag, or search existing tags"
                onChange={(value) => setCurrentTag(value)}
                onKeyDown={(e) => {
                  const trimmedTag = currentTag.trim();
                  if (e.key === "Enter") {
                    if (trimmedTag.length > 0) {
                      const capitalizedTag = trimmedTag
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                      setCurrentTag("");
                      field.onChange([...new Set([...value, capitalizedTag])]);
                    } else {
                      setCurrentTag("");
                    }
                  }
                }}
                value={currentTag}
              />

              <Grid2 container spacing={1}>
                {allUniqueTags.map((tag) => (
                  <Tag
                    key={tag}
                    text={tag}
                    active={value.includes(tag)}
                    onClick={() => {
                      // move from one array to another
                      if (value.includes(tag)) {
                        field.onChange(value.filter((t) => t !== tag));
                      } else {
                        field.onChange([...new Set([...value, tag])]);
                      }
                    }}
                  />
                ))}
              </Grid2>
              <ErrorText
                error={!!fieldState.error}
                helperText="Must have at least one tag"
              />
            </>
          )}
        />
      </Stack>
    </Group>
  );
};
