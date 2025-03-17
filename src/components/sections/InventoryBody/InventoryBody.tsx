import { Stack } from "@mui/material";
import React from "react";
import { InventoryItem as InventoryItemType } from "../../../api";
import { InventoryItem } from "../../blocks/InventoryItem";

export const InventoryBody = ({
  inventory,
}: {
  inventory: InventoryItemType[];
}) => {
  return (
    <Stack
      sx={{
        height: "fit-content",
        maxWidth: "800px",
        width: 1,
      }}
      spacing={2}
    >
      {inventory.map((item) => (
        <InventoryItem key={item.id} {...item} />
      ))}
    </Stack>
  );
};
