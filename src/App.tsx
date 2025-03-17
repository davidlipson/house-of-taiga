import React, { useState } from "react";
import "./styles/globals.css";
import { Create, Inventory, Upload } from "./components/pages";
import { Stack } from "@mui/material";
import { Nav, Pages } from "./components/blocks";

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.INVENTORY);
  return (
    <Stack spacing={12}>
      <Nav value={page} onChange={setPage} />
      {page === Pages.UPLOAD && <Upload />}
      {page === Pages.INVENTORY && <Inventory />}
      {page === Pages.CREATE && <Create />}
    </Stack>
  );
};
export default App;
