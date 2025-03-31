import { Button } from "../../blocks";

import { Stack, TextField, Typography } from "@mui/material";
import { Dropdown } from "../../blocks";
import { ColourWheel } from "../../blocks";
import { Colour } from "../Form/schema";
import { useTags } from "../../../api";
import { useState } from "react";
import React from "react";
import { colours } from "../../../styles";
export const QuiltGenerate = ({
  generate,
  hidden = false,
  openGenerate,
}: {
  generate: (params: {
    squaresAcross: number;
    squaresDown: number;
    tags: string[];
    primaryColour: Colour;
    secondaryColour: Colour;
  }) => void;
  hidden?: boolean;
  openGenerate: () => void;
}) => {
  const [squaresAcross, setSquaresAcross] = useState<number | undefined>(
    undefined
  );
  const [squaresDown, setSquaresDown] = useState<number | undefined>(undefined);

  const [tags, setTags] = useState<string[]>([]);
  const [primaryColour, setPrimaryColour] = useState<Colour>({
    a: 1,
    h: 1,
    s: 1,
    v: 1,
  });
  const [secondaryColour, setSecondaryColour] = useState<Colour>({
    a: 1,
    h: 1,
    s: 1,
    v: 1,
  });

  const handleNumberChange = (
    value: string,
    setter: (value: number | undefined) => void
  ) => {
    const num = parseFloat(value);
    if (value === "") {
      setter(undefined);
    } else if (!isNaN(num) && num > 0) {
      setter(num);
    }
  };

  const { data: existingTags } = useTags();
  return hidden ? (
    <Stack
      component="button"
      bgcolor={colours.lightGrey}
      p={2}
      borderRadius="8px"
      width="fit-content"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      border="1px solid"
      borderColor={colours.grey}
      position="absolute"
      left="16px"
      bottom="16px"
      onClick={openGenerate}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: colours.grey,
        },
      }}
    >
      <Typography>Generate</Typography>
    </Stack>
  ) : (
    <Stack
      bgcolor={colours.lightGrey}
      p={4}
      borderRadius="16px"
      width="500px"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      border="1px solid"
      borderColor={colours.grey}
      position="absolute"
      left="16px"
      bottom="16px"
    >
      <Stack
        justifyContent="center"
        direction="row"
        width={1}
        spacing={1}
        alignItems="center"
      >
        <TextField
          placeholder="Squares across"
          onChange={(e) => handleNumberChange(e.target.value, setSquaresAcross)}
          value={squaresAcross || ""}
          type="number"
          fullWidth
          inputProps={{ min: 1 }}
        />
        <TextField
          placeholder="Squares down"
          onChange={(e) => handleNumberChange(e.target.value, setSquaresDown)}
          value={squaresDown || ""}
          type="number"
          fullWidth
          inputProps={{ min: 1 }}
        />
      </Stack>
      <Dropdown
        options={existingTags?.map((tag) => tag.name) || []}
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
      <Stack direction="row" spacing={2}>
        <Stack spacing={1}>
          <Typography align="center">Primary Colour</Typography>
          <ColourWheel
            value={primaryColour}
            onChange={setPrimaryColour}
            width={100}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography align="center">Secondary Colour</Typography>
          <ColourWheel
            value={secondaryColour}
            onChange={setSecondaryColour}
            width={100}
          />
        </Stack>
      </Stack>
      <Button
        sx={{ width: "100%" }}
        text="Generate Quilt"
        onClick={() => {
          if (squaresAcross && squaresDown) {
            generate({
              squaresAcross,
              squaresDown,
              tags,
              primaryColour,
              secondaryColour,
            });
          }
        }}
      />
    </Stack>
  );
};
