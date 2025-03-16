import { Stack, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React from "react";

export const UploadImage = () => {
  return (
    <Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <UploadFileIcon />
        <Typography fontWeight={300} sx={{ textDecoration: "underline" }}>
          Upload image
        </Typography>
      </Stack>
    </Stack>
  );
};
