import { Input, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Quilt, QuiltGenerate } from "../sections/Quilt";
import { Button, ColourWheel, Dropdown } from "../blocks";
import { useTags } from "../../api";
import { Colour } from "../sections/Form/schema";

export const Create = () => {
  const [generateHidden, setGenerateHidden] = useState(false);
  const [squaresAcross, setSquaresAcross] = useState<number | undefined>(
    undefined
  );
  const [squaresDown, setSquaresDown] = useState<number | undefined>(undefined);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={2}
    >
      <QuiltGenerate
        openGenerate={() => setGenerateHidden(false)}
        generate={({
          squaresAcross,
          squaresDown,
          tags,
          primaryColour,
          secondaryColour,
        }: {
          squaresAcross: number;
          squaresDown: number;
          tags: string[];
          primaryColour: Colour;
          secondaryColour: Colour;
        }) => {
          setSquaresAcross(squaresAcross);
          setSquaresDown(squaresDown);
          setGenerateHidden(true);
        }}
        hidden={generateHidden}
      />
      {squaresAcross && squaresDown && (
        <Quilt dimensions={{ width: squaresAcross, height: squaresDown }} />
      )}
    </Stack>
  );
};
