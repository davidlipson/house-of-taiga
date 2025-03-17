import { Grid2, Stack } from "@mui/material";
import { Input } from "../../../blocks/Input";
import { Tag } from "../../../blocks/Tag";
import React, { useState } from "react";
import { Group } from "./Group";
import { Control, Controller } from "react-hook-form";
import { UploadFields, uploadSchema } from "../schema";
import { z } from "zod";
import { ErrorText } from "../../../blocks";
import { existingTags } from "../../../../api";

export const AddTags = ({
  control,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
}) => {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>(existingTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allUniqueTags = [...new Set([...selectedTags, ...suggestedTags])];
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
                      setSelectedTags([
                        ...new Set([...selectedTags, capitalizedTag]),
                      ]);
                      setCurrentTag("");
                      field.onChange([
                        ...new Set([...selectedTags, capitalizedTag]),
                      ]);
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
                    active={selectedTags.includes(tag)}
                    onClick={() => {
                      // move from one array to another
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter((t) => t !== tag));
                        field.onChange(selectedTags.filter((t) => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                        field.onChange([...new Set([...selectedTags, tag])]);
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
