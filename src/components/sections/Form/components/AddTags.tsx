import { Grid2, Stack } from "@mui/material";
import { Input } from "../../../blocks/Input";
import { Tag } from "../../../blocks/Tag";
import React from "react";
import { Group } from "./Group";

export const AddTags = () => {
  return (
    <Group label="Tags">
      <Stack spacing={1}>
        <Input
          placeholder="Press enter to add new tag, or search existing tags"
          onChange={() => {}}
          value=""
        />
        <Grid2 container spacing={1}>
          <Tag active text="Tag 1" onClick={() => {}} />
          <Tag text="Tag 2" onClick={() => {}} />
          <Tag text="Tag 3" onClick={() => {}} />
          <Tag text="Tag 2" onClick={() => {}} />
        </Grid2>
      </Stack>
    </Group>
  );
};
