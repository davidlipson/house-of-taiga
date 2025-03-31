import { Stack, styled } from "@mui/material";
import React from "react";
import { colours } from "../../styles";

const ButtonStyled = styled(Stack)(({ size }: { size: "large" | "small" }) => ({
  backgroundColor: colours.black,
  color: colours.white,
  padding: "12px",
  borderRadius: "12px",
  alignItems: "center",
  fontSize: size === "large" ? "14px" : "12px",
  fontWeight: 300,
  height: "fit-content",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colours.darkGrey,
  },
}));

export const Button = ({
  text,
  size = "large",
  onClick,
  sx,
}: {
  text: string | React.ReactNode;
  size?: "large" | "small";
  sx?: any;
  onClick: () => void;
}) => {
  return (
    <ButtonStyled sx={sx} size={size} onClick={onClick}>
      {text}
    </ButtonStyled>
  );
};
