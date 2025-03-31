import React, { useState } from "react";
import "./styles/globals.css";
import { Create, Inventory, Upload } from "./components/pages";
import { Stack } from "@mui/material";
import { Nav, Pages } from "./components/blocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.CREATE);
  return (
    <Stack spacing={12}>
      <QueryClientProvider client={queryClient}>
        <Nav value={page} onChange={setPage} />
        <Stack paddingX={4}>
          {page === Pages.INVENTORY && <Inventory />}
          {page === Pages.CREATE && <Create />}
        </Stack>
      </QueryClientProvider>
    </Stack>
  );
};
export default App;
