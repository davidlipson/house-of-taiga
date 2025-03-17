import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ErrorText } from "./ErrorText";
import { colours } from "../../styles";

export const Input = ({
  placeholder,
  onChange,
  type = "text",
  value,
  error,
  helperText,
  onKeyDown,
}: {
  value?: string | number;
  placeholder: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "currency";
  error?: boolean;
  helperText?: string;
}) => {
  return (
    <Stack>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
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
        onKeyDown={onKeyDown}
        type={type === "currency" ? "number" : type}
        InputProps={{
          startAdornment:
            type === "currency" ? (
              <InputAdornment position="start">$</InputAdornment>
            ) : null,
        }}
      />
      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
