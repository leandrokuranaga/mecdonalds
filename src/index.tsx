import React from "react";
import ReactDOM from "react-dom/client";
import RouterPage from "./routes/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterPage />
  </React.StrictMode>
);
