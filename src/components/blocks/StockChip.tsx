import { Stack, Typography } from "@mui/material";
import { colours } from "../../styles";
import React from "react";
export const StockChip = ({ quantity }: { quantity: number }) => {
  return (
    <Stack
      bgcolor={quantity > 0 ? colours.green : colours.red}
      borderRadius={2}
      width="fit-content"
      paddingX={1}
      paddingY={0.5}
    >
      <Typography color={colours.white} fontWeight={400} fontSize="12px">
        {quantity > 0 ? `In Stock: ${quantity}` : "Out of Stock"}
      </Typography>
    </Stack>
  );
};
