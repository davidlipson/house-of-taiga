import React from "react";
import { Stack, styled, Typography } from "@mui/material";
import { colours } from "../../styles";
import CheckIcon from "@mui/icons-material/Check";

const TagStyled = styled(Stack)<{ active?: boolean }>(({ active }) => ({
  color: active ? colours.white : colours.black,
  padding: "8px",
  borderRadius: "12px",
  alignItems: "center",
  fontWeight: 400,
  backgroundColor: active ? colours.black : colours.lightGrey,
  width: "fit-content",
  cursor: "pointer",
}));

export const Tag = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <TagStyled active={active} direction="row" onClick={onClick}>
      <Stack direction="row" spacing={1} alignItems="center">
        {active && (
          <CheckIcon
            sx={{
              fontSize: "14px",
            }}
          />
        )}
        <Typography fontSize="12px">{text}</Typography>
      </Stack>
    </TagStyled>
  );
};
