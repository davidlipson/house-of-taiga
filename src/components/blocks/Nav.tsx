import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import { colours } from "../../styles";

export enum Pages {
  UPLOAD = "upload",
  INVENTORY = "inventory",
  CREATE = "create",
}

export const Nav = ({
  value,
  onChange,
}: {
  value: Pages;
  onChange: (value: Pages) => void;
}) => {
  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{
        backgroundColor: colours.blue,
        fontWeight: 400,
        position: "fixed",
        top: 0,
        width: "100%",
        justifyContent: "space-around",
        opacity: 1,
        zIndex: 1000,
        "& button": {
          color: colours.lightGrey,
          width: "100%",
        },
        "& .MuiBottomNavigationAction-label": {
          fontSize: "16px !important",
        },
        "& button.Mui-selected": {
          color: colours.white,
          textDecoration: "underline",
        },
      }}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    >
      <BottomNavigationAction label="Upload" value={Pages.UPLOAD} />
      <BottomNavigationAction label="Inventory" value={Pages.INVENTORY} />
      <BottomNavigationAction label="Create" value={Pages.CREATE} />
    </BottomNavigation>
  );
};
