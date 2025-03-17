import { Stack, Typography } from "@mui/material";
import { colours } from "../../styles";
import React from "react";
export const ShelfChip = ({ shelf }: { shelf: string }) => {
  return (
    <Stack
      bgcolor={colours.blue}
      borderRadius={2}
      width="fit-content"
      paddingX={1}
      paddingY={0.5}
    >
      <Typography color={colours.white} fontWeight={400} fontSize="12px">
        {shelf}
      </Typography>
    </Stack>
  );
};
