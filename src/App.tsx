import React from "react";
import "./styles/globals.css";
import { Upload } from "./components/pages";
import { Stack } from "@mui/material";
import { Nav, Pages } from "./components/blocks";

const App = () => {
  return (
    <Stack spacing={15}>
      <Nav value={Pages.UPLOAD} onChange={() => {}} />
      <Upload />
    </Stack>
  );
};
export default App;
