import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";

const createHtmlDoc = (initialData, appString, scriptTags) => {
  const helmet = Helmet.renderStatic();
  const lang = "fr";
  return `<!DOCTYPE html>
  <html lang="${lang}">
  
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1">
      <meta name="mobile-web-app-capable" content="yes">
      <meta charset="utf-8">
      <meta name="theme-color" content="#f3c161">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="shortcut icon" href="/statics/img/favicon.png">
      <link href="/statics/css/main.css" rel="stylesheet">
      ${helmet?.title.toString() || ""}
      ${helmet?.meta.toString() || ""}  
  </head>  
  <body>
      <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
      <div id="root">${appString}</div>
      ${scriptTags}
  </body>
  </html>`;
};

export default createHtmlDoc;
