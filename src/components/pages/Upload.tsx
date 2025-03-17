import { Stack, Typography } from "@mui/material";
import { Form } from "../sections/Form/Form";
import React, { useState } from "react";
import { colours } from "../../styles";
export const Upload = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Stack width="100vw" height="fit-content" alignItems="center">
      {submitted ? (
        <Typography fontWeight={300} fontSize="16px" color={colours.black}>
          Added to your inventory.
        </Typography>
      ) : (
        <Form onSubmit={() => setSubmitted(true)} />
      )}
    </Stack>
  );
};
