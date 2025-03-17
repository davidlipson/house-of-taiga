import {
  FormControlLabel,
  RadioGroup,
  Stack,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorText } from "./ErrorText";

type RadioOption<T> = {
  label: string;
  value: T;
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
      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <FormControlLabel
            sx={{
              "& .MuiFormControlLabel-label": {
                fontWeight: 300,
              },
            }}
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
            onChange={() => onChange(option.value)}
          />
        ))}
      </RadioGroup>
      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
