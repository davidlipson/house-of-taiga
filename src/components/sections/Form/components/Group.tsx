import { Stack, Typography } from "@mui/material";
import React from "react";
export const Group = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  return (
    <Stack spacing={1}>
      {label && <Typography fontWeight={200}>{label}</Typography>}
      {children}
    </Stack>
  );
};
