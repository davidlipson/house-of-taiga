import {
  FormControlLabel,
  RadioGroup,
  Stack,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorText } from "./ErrorText";
import { colours } from "../../styles";

type RadioOption<T> = {
  label: string;
  value: T;
  description?: string;
};

export const Radios = <T,>({
  value,
  options,
  onChange,
  error,
  helperText,
}: {
  value: T;
  options: RadioOption<T>[];
  onChange: (value: any) => void;
  error?: boolean;
  helperText?: string;
}) => {
  return (
    <Stack>
      <RadioGroup
        sx={{
          gap: 0.5,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <FormControlLabel
            sx={{
              margin: 0,
              "& .MuiSvgIcon-root": {
                fill: colours.darkGrey,
              },
              "& .MuiFormControlLabel-label": {
                fontWeight: 300,
                fontSize: "14px",
                width: "100%",
              },
              border:
                value === option.value
                  ? `1px solid ${colours.darkGrey}`
                  : `1px solid ${colours.grey}`,
              borderRadius: "12px",
              height: "40px",
              "&.Mui-checked": {
                border: `1px solid ${colours.black}`,
              },
            }}
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
