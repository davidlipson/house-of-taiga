import {
  Autocomplete,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorText } from "./ErrorText";
import { colours } from "../../styles";

export const Dropdown = ({
  placeholder,
  onChange,
  value,
  error,
  helperText,
  options,
  multiple = false,
}: {
  value?: string | string[] | null;
  placeholder: string;
  onChange?: (value: string | string[] | null) => void;
  error?: boolean;
  helperText?: string;
  options: string[];
  multiple?: boolean;
}) => {
  return (
    <Stack>
      <Autocomplete
        freeSolo={!multiple}
        fullWidth
        multiple={multiple}
        onChange={(e, value) => onChange?.(value)}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& input": {
                  fontWeight: 300,
                  fontSize: "16px",
                },
                "& fieldset": {
                  borderRadius: "12px",
                  border: `1px solid ${colours.grey} !important`,
                },
              },
              "& .Mui-focused": {
                "& fieldset": {
                  borderRadius: "12px",
                  border: `1px solid ${colours.darkGrey} !important`,
                },
              },
            }}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
          />
        )}
      />

      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
