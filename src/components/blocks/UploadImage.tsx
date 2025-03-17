import { Button, Stack, styled, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React from "react";
import { ErrorText } from "./ErrorText";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadImage = ({
  value,
  onChange,
  error,
  helperText,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  error: boolean;
  helperText: string;
}) => {
  return (
    <Stack spacing={1}>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        sx={{
          textTransform: "none",
        }}
        startIcon={<UploadFileIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            onChange(event.target.files?.[0] || null);
          }}
        />
      </Button>
      {value && (
        <Typography fontWeight={200} fontSize="14px">
          {value.name}
        </Typography>
      )}
      <ErrorText error={error} helperText={helperText} />
    </Stack>
  );
};
