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
};

export const Tag = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <Stack
      width="fit-content"
      direction="row"
      spacing={1}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: colours.grey,
        },
        ...tagStyle,
        backgroundColor: active ? colours.black : colours.lightGrey,
        color: active ? colours.grey : colours.darkGrey,
      }}
      onClick={onClick}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {active && <CheckIcon sx={{ fontSize: "20px" }} />}
        <Typography fontSize="14px">{text}</Typography>
      </Stack>
    </Stack>
  );
};
