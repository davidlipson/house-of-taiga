import { Stack } from "@mui/material";
import React from "react";
import { colours } from "../../styles";

const buttonStyle = {
  backgroundColor: colours.black,
  color: colours.white,
  padding: "12px",
  borderRadius: "12px",
  alignItems: "center",
  fontWeight: 200,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colours.darkGrey,
  },
};

export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <Stack sx={buttonStyle} onClick={onClick}>
      {text}
    </Stack>
  );
};
