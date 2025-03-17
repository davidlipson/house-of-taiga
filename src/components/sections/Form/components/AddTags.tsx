import { Grid2, Stack } from "@mui/material";
import { Input } from "../../../blocks/Input";
import { Tag } from "../../../blocks/Tag";
import React, { useState } from "react";
import { Group } from "./Group";
import { Control, Controller } from "react-hook-form";
import { UploadFields, uploadSchema } from "../schema";
import { z } from "zod";
import { ErrorText } from "../../../blocks";

export const AddTags = ({
  control,
}: {
  control: Control<z.infer<typeof uploadSchema>>;
}) => {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([
    "Tag 1",
    "Tag 2",
    "Tag 3",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allUniqueTags = [...new Set([...suggestedTags, ...selectedTags])];
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
                  if (e.key === "Enter" && currentTag?.length > 0) {
                    setSelectedTags([
                      ...new Set([...selectedTags, currentTag]),
                    ]);
                    setCurrentTag("");
                    field.onChange([...new Set([...selectedTags, currentTag])]);
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
