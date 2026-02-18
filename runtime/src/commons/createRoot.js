import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";

const createRoot = (App, isSsr) => {
  if (!isSsr) {
    const root = ReactDom.createRoot(document.getElementById("root"));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  } else {
    const initialData = window.__INITIAL_DATA__;

    delete window.__INITIAL_DATA__;

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
