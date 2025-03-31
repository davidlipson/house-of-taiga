import { Stack, Typography } from "@mui/material";

import { Modal } from "@mui/material";
import { colours } from "../../styles";
import { Button } from "./Button";
import { useDeleteInventoryItem } from "../../api";
import React from "react";

export const DeleteItem = ({
  open,
  id,
  close,
}: {
  open: boolean;
  id: string;
  close: () => void;
}) => {
  const { mutate: deleteInventoryItem } = useDeleteInventoryItem();
  return (
    <Modal open={open} onClose={close}>
      <Stack
        spacing={5}
        sx={(theme) => ({
          backgroundColor: colours.white,
          display: "flex",
          padding: "24px",
          width: "400px",
          marginBottom: "40px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        })}
      >
        <Stack spacing={2}>
          <Typography fontWeight={300} fontSize="16px" color={colours.black}>
            Are you sure you want to delete this item from your inventory?
          </Typography>
        </Stack>
        <Stack width={1} direction="row" spacing={2} justifyContent="flex-end">
          <Button
            text="Yes, delete"
            onClick={() => {
              deleteInventoryItem(id);
              close();
            }}
          />
          <Button text="No, cancel" onClick={close} />
        </Stack>
      </Stack>
    </Modal>
  );
};
