import { Stack } from "@mui/material";
import React from "react";
import { colours } from "../../../styles";

export const Quilt = ({
  dimensions = { width: 10, height: 10 },
}: {
  dimensions?: { width: number; height: number };
}) => {
  const maxSize = 800;
  const aspectRatio = dimensions.width / dimensions.height;

  // Calculate the maximum dimensions that maintain aspect ratio
  const maxWidth = aspectRatio > 1 ? maxSize : maxSize * aspectRatio;
  const maxHeight = aspectRatio > 1 ? maxSize / aspectRatio : maxSize;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
          aspectRatio: `${dimensions.width} / ${dimensions.height}`,
          display: "grid",
          gridTemplateColumns: `repeat(${dimensions.width}, 1fr)`,
          gridTemplateRows: `repeat(${dimensions.height}, 1fr)`,
          bgcolor: colours.grey,
          border: `1px solid ${colours.grey}`,
        }}
      >
        {Array.from({ length: dimensions.width * dimensions.height }).map(
          (_, index) => (
            <Stack
              key={index}
              sx={{
                aspectRatio: "1",
                bgcolor: colours.white,
                cursor: "pointer",
                border: `1px solid ${colours.grey}`,
                "&:hover": {
                  bgcolor: colours.lightGrey,
                },
              }}
            />
          )
        )}
      </Stack>
    </Stack>
  );
};
