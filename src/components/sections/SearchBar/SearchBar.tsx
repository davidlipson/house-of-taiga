import { Stack } from "@mui/material";
import React, { useState } from "react";
import { colours } from "../../../styles";
import { Button, Dropdown, Input } from "../../blocks";
import { existingTags } from "../../../api";

export const SearchBar = ({
  submitSearch,
}: {
  submitSearch: (query: string, tags: string[]) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  return (
    <Stack
      sx={{
        maxWidth: "800px",
        width: 1,
      }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Stack width="100%">
        <Input
          placeholder="Search name or brand"
          value={search}
          onChange={(value) => setSearch(value)}
        />
      </Stack>
      <Stack width="100%">
        <Dropdown
          options={existingTags}
          multiple
          placeholder="Select tags"
          value={tags}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setTags(value);
            } else {
              setTags(value ? [value] : []);
            }
          }}
        />
      </Stack>
      <Button text="Search" onClick={() => {}} />
    </Stack>
  );
};
