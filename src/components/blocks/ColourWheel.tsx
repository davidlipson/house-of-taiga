import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

import React from "react";
import { Stack } from "@mui/material";
import ShadeSlider from "@uiw/react-color-shade-slider";
import { ErrorText } from "./ErrorText";
import { Colour } from "../sections/Form/schema";

export const ColourWheel = ({
  value,
  onChange,
  error,
  helperText,
  width = 150,
}: {
  value: Colour;
  onChange: (colour: Colour) => void;
  error?: boolean;
  helperText?: string;
  width?: number;
}) => {
  return (
    <Stack
      width={1}
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing={2} alignItems="center">
        <Wheel
          color={value}
          width={width}
          height={width}
          onChange={(colour) => onChange({ ...value, ...colour.hsva })}
        />
        <ShadeSlider
          hsva={value}
          style={{ width }}
          onChange={(newShade) => {
            onChange({ ...value, ...newShade });
          }}
        />
      </Stack>
      <Stack
        borderRadius="16px"
        width={width}
        height="100%"
        bgcolor={hsvaToHex(value)}
      ></Stack>
      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
