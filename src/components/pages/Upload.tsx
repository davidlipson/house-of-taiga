import { Stack, Typography } from "@mui/material";
import { Form } from "../sections/Form/Form";
import React, { useState } from "react";
import { colours } from "../../styles";
export const Upload = () => {
  const [submitted, setSubmitted] = useState(false);
  // TODO: return from API should have the InventoryItem
  // should specify the location of the item, display this below
  // so Taiga knows where to put it!

  return (
    <Stack width="100vw" height="fit-content" alignItems="center">
      {submitted ? (
        <Typography fontWeight={300} fontSize="16px" color={colours.black}>
          Added to your inventory.
        </Typography>
      ) : (
        <Form
          onSubmit={(data) => {
            setSubmitted(true);
          }}
        />
      )}
    </Stack>
  );
};
