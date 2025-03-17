import { Grid2, Stack, Typography } from "@mui/material";
import type { InventoryItem as InventoryItemType } from "../../api";
import React from "react";
import { colours } from "../../styles";
import { Tag } from "./Tag";

export const InventoryItem = (item: InventoryItemType) => {
  return (
    <Stack
      border={`1px solid ${colours.grey}`}
      borderRadius={1}
      padding={2}
      direction="row"
      spacing={2}
    >
      <Stack
        bgcolor={colours.grey}
        height="100%"
        sx={{ aspectRatio: 1 }}
      ></Stack>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Stack spacing={0.25}>
            <Typography
              color={colours.black}
              textTransform="capitalize"
              fontWeight={400}
              fontSize="16px"
            >
              {item.name}
            </Typography>
            <Typography
              textTransform="uppercase"
              fontWeight={400}
              color={colours.darkGrey}
              fontSize="12px"
            >
              {item.brand}
            </Typography>
          </Stack>
          {item.quantity > 0 ? (
            <Typography color={colours.green} fontWeight={400} fontSize="14px">
              In Stock: {item.quantity}
            </Typography>
          ) : (
            <Typography color={colours.red} fontWeight={400} fontSize="14px">
              Out of Stock
            </Typography>
          )}
        </Stack>
        {item.tags?.length && (
          <Grid2 container spacing={1}>
            {item.tags?.slice(0, 5).map((tag) => (
              <Tag size="small" active key={tag} text={tag} />
            ))}
            {item.tags?.length > 5 && (
              <Typography
                color={colours.darkGrey}
                fontWeight={400}
                fontSize="12px"
              >
                + {item.tags?.length - 5} more
              </Typography>
            )}
          </Grid2>
        )}
      </Stack>
    </Stack>
  );
};
