import React from "react";
import { Stack, Typography } from "@mui/material";
import { colours } from "../../styles";
import CheckIcon from "@mui/icons-material/Check";

const tagStyle = {
  color: colours.white,
  padding: "8px",
  borderRadius: "12px",
  alignItems: "center",
  fontWeight: 400,
  backgroundColor: colours.grey,
};

export const Tag = ({
  text,
  active,
  size = "large",
  onClick,
}: {
  text: string;
  size?: "small" | "large";
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Stack
      width="fit-content"
      direction="row"
      spacing={1}
      sx={{
        cursor: "pointer",
        "&:hover": active
          ? {}
          : {
              backgroundColor: colours.grey,
            },
        ...tagStyle,
        backgroundColor: active ? colours.black : colours.lightGrey,
        color: active ? colours.grey : colours.darkGrey,
      }}
      onClick={onClick}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {active && (
          <CheckIcon sx={{ fontSize: size === "large" ? "20px" : "14px" }} />
        )}
        <Typography fontSize={size === "large" ? "14px" : "12px"}>
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};
