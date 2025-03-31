import { Stack, Typography } from "@mui/material";
import { colours } from "../../styles";
import React from "react";
import { Bin } from "../../api";
export const BinChip = ({ bin }: { bin: Bin }) => {
  return (
    <Stack
      bgcolor={colours.blue}
      borderRadius={2}
      width="fit-content"
      paddingX={1}
      paddingY={0.5}
    >
      <Typography color={colours.white} fontWeight={400} fontSize="12px">
        {bin.name}
      </Typography>
    </Stack>
  );
};
