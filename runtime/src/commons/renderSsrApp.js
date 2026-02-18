import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import createHtmlDoc from "./createHtmlDoc";
import path from "path";

const statsFile = path.resolve(
  process.env.APP_PATH,
  "build/client/loadable-stats.json",
);

const extractor = new ChunkExtractor({ statsFile });

const renderSsrApp = (App, initialData, location) => {
  const appString = renderToString(
    extractor.collectChunks(
      <StaticRouter location={location} context={initialData}>
        <App initialData={initialData} />
      </StaticRouter>,
    ),
  );

  const scriptTags = extractor.getScriptTags();

  const html = createHtmlDoc(initialData, appString, scriptTags);
  return html;
};

export default renderSsrApp;
