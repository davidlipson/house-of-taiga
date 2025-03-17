import { Stack } from "@mui/material";
import React, { useState } from "react";
import { SearchBar } from "../sections";
import { InventoryBody } from "../sections/InventoryBody";
import { existingInventory, InventoryItem } from "../../api";

export const Inventory = () => {
  const [inventory, setInventory] =
    useState<InventoryItem[]>(existingInventory);
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" paddingX={2}>
      <SearchBar
        submitSearch={(query, tags) => {
          console.log(query, tags);
        }}
      />
      <InventoryBody inventory={inventory} />
    </Stack>
  );
};
