import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement === null)
  throw new Error("Root container missing in index.html");

const root = createRoot(rootElement);

root.render(<App />);
