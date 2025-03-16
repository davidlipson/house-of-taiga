import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ErrorText } from "./ErrorText";

export const Input = ({
  placeholder,
  onChange,
  type = "text",
  value,
  error,
  helperText,
}: {
  value: string | number;
  placeholder: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "currency";
  error?: boolean;
  helperText?: string;
}) => {
  return (
    <Stack>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& input": {
              fontWeight: 300,
            },
          },
        }}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
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
