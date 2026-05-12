import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";

const createRoot = (App) => {
  if (SSR_DISABLED) {
    const root = ReactDom.createRoot(document.getElementById("root"));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  } else {
    const dataContainer = document.getElementById("__EZY_SSR_DATA__");
    const initialData = dataContainer
      ? JSON.parse(dataContainer.textContent)
      : null;

    loadableReady(() => {
      ReactDom.hydrateRoot(
        document.getElementById("root"),
        <BrowserRouter>
          <App initialData={initialData} />
        </BrowserRouter>,
      );
    });
  }
};

export default createRoot;
