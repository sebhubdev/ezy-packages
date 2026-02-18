import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import createHtmlDoc from "./createHtmlDoc";
import path from "path";

const renderSsrApp = (App, initialData, location) => {
  const statsFile = path.resolve(
    process.env.APP_PATH,
    "build/client/loadable-stats.json",
  );
  const extractor = new ChunkExtractor({ statsFile });
  const appString = renderToString(
    extractor.collectChunks(
      <StaticRouter location={location}>
        <App initialData={initialData} />
      </StaticRouter>,
    ),
  );

  const assets = {
    scriptTags: extractor.getScriptTags(),
    linkTags: extractor.getLinkTags(),
    styleTags: extractor.getStyleTags(),
  };

  const html = createHtmlDoc(initialData, appString, assets);
  return html;
};

export default renderSsrApp;
