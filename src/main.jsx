import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Live from "./components/Live.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Live />
      <App />
   </StrictMode>
);
