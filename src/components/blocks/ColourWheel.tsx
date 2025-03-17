import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

import React from "react";
import { Stack } from "@mui/material";
import ShadeSlider from "@uiw/react-color-shade-slider";

type Colour = {
  h: number;
  s: number;
  v: number;
  a: number;
};

export const ColourWheel = ({
  value,
  onChange,
}: {
  value: Colour;
  onChange: (colour: Colour) => void;
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
          width={150}
          height={150}
          onChange={(colour) => onChange({ ...value, ...colour.hsva })}
        />
        <ShadeSlider
          hsva={value}
          style={{ width: 150 }}
          onChange={(newShade) => {
            onChange({ ...value, ...newShade });
          }}
        />
      </Stack>
      <Stack
        borderRadius="16px"
        width={150}
        height="100%"
        bgcolor={hsvaToHex(value)}
      ></Stack>
    </Stack>
  );
};
