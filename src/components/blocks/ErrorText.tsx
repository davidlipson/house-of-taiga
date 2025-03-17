import { Typography } from "@mui/material";
import React from "react";
export const ErrorText = ({
  error,
  helperText,
}: {
  error?: boolean;
  helperText?: string;
}) => {
  if (!error || !helperText) return null;
  return (
    <Typography marginTop={0.5} fontWeight={100} fontSize={12} color="error">
      {helperText}
    </Typography>
  );
};
