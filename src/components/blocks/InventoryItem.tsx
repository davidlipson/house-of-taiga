import {
  Grid2,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { InventoryItem as InventoryItemType } from "../../api";
import React, { useState } from "react";
import { colours } from "../../styles";
import { Tag } from "./Tag";
import { hsvaToHex } from "@uiw/color-convert";
import { StockChip } from "./StockChip";
import EditIcon from "@mui/icons-material/Edit";
import { Form } from "../sections";
import { UploadFields } from "../sections/Form/schema";
import { BinChip } from "./BinChip";
export const InventoryItem = (item: InventoryItemType) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const shownTags = isMobile ? 1 : 3;
  return (
    <>
      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Form
          isEditing={isEditing}
          onSubmit={() => setIsEditing(false)}
          defaultValues={{
            [UploadFields.NAME]: item.name,
            [UploadFields.BRAND]: item.brand.name,
            [UploadFields.SQUARES]: 0,
            [UploadFields.CUSTOM_SQUARES]: item.quantity,
            [UploadFields.COST]: item.cost,
            [UploadFields.TAGS]: item.tags.map((tag) => tag.name),
            [UploadFields.IMAGE]: new File([], "image.png"), //item.image,
            [UploadFields.IS_MULTI_COLOUR]: !item.colour,
            [UploadFields.COLOUR]: /* TODO: item.colour || */ {
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
        spacing={{
          xs: 0,
          sm: 2,
        }}
        justifyContent="space-between"
      >
        <Stack
          bgcolor={
            item.colour // TODO: string color to hsva
              ? hsvaToHex({ h: 214, s: 43, v: 90, a: 1 })
              : colours.grey
          }
          height="100%"
          display={{
            xs: "none",
            sm: "flex",
          }}
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
                  {item.brand.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                {/* when quantity runs out, remove the bin in the db entry */}
                <BinChip bin={item.bin} />
                <StockChip quantity={item.quantity} />
              </Stack>
            </Stack>
            <EditIcon
              sx={{ cursor: "pointer", color: colours.black, fontSize: "18px" }}
              onClick={() => setIsEditing(!isEditing)}
            />
          </Stack>
          {item.tags?.length && (
            <Grid2 overflow="hidden" container spacing={1}>
              {item.tags?.slice(0, shownTags).map((tag) => (
                <Tag active key={tag.id} text={tag.name} />
              ))}
              {item.tags?.length > shownTags && (
                <Typography
                  color={colours.darkGrey}
                  fontWeight={400}
                  fontSize="12px"
                >
                  + {item.tags?.length - shownTags} more
                </Typography>
              )}
            </Grid2>
          )}
        </Stack>
      </Stack>
    </>
  );
};
