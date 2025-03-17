import { Grid2, Modal, Stack, Typography } from "@mui/material";
import type { InventoryItem as InventoryItemType } from "../../api";
import React, { useState } from "react";
import { colours } from "../../styles";
import { Tag } from "./Tag";
import { hsvaToHex } from "@uiw/color-convert";
import { StockChip } from "./StockChip";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "./Button";
import { Form } from "../sections";
import { UploadFields } from "../sections/Form/schema";
export const InventoryItem = (item: InventoryItemType) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(item.colour && hsvaToHex(item.colour));
  return (
    <>
      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Form
          isEditing={isEditing}
          onSubmit={() => setIsEditing(false)}
          defaultValues={{
            [UploadFields.NAME]: item.name,
            [UploadFields.BRAND]: item.brand,
            [UploadFields.SQUARES]: 0,
            [UploadFields.CUSTOM_SQUARES]: item.quantity,
            [UploadFields.COST]: item.cost,
            [UploadFields.TAGS]: item.tags || [],
            [UploadFields.IMAGE]: new File([], "image.png"), //item.image,
            [UploadFields.IS_MULTI_COLOUR]: !item.colour,
            [UploadFields.COLOUR]: item.colour || {
              h: 214,
              s: 43,
              v: 90,
              a: 1,
            },
          }}
        />
      </Modal>
      <Stack
        border={`1px solid ${colours.grey}`}
        borderRadius={1}
        height="150px"
        overflow="hidden"
        padding={2}
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Stack
          bgcolor={item.colour ? hsvaToHex(item.colour) : colours.grey}
          height="100%"
          sx={{ aspectRatio: 1 }}
        ></Stack>
        <Stack spacing={3} width={1} justifyContent="space-between">
          <Stack width={1} direction="row" justifyContent="space-between">
            <Stack spacing={1}>
              <Stack>
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
                  color={colours.grey}
                  fontSize="12px"
                >
                  {item.brand}
                </Typography>
              </Stack>
              <StockChip quantity={item.quantity} />
            </Stack>
            <EditIcon
              sx={{ cursor: "pointer", color: colours.black, fontSize: "18px" }}
              onClick={() => setIsEditing(!isEditing)}
            />
          </Stack>
          {item.tags?.length && (
            <Grid2 overflow="hidden" container spacing={1}>
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
    </>
  );
};
