import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";

const createHtmlDoc = (initialData, appString, assets) => {
  const { scriptTags = "", linkTags = "", styleTags = "" } = assets || {};
  const helmet = Helmet.renderStatic();
  const lang = "fr";

  const json = JSON.stringify(initialData)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return `
    <!DOCTYPE html>
    <html lang="${lang}">  
        <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1">
                <meta name="mobile-web-app-capable" content="yes">
                <meta charset="utf-8">
                <meta name="theme-color" content="#f3c161">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <link rel="shortcut icon" href="/statics/img/favicon.png">
                ${helmet?.title.toString() || ""}
                ${helmet?.meta.toString() || ""}  
                ${helmet?.link.toString() || ""}
                ${helmet?.script.toString() || ""}
                ${linkTags}
                <link href="/statics/css/main.css" rel="stylesheet">
                ${styleTags}
        </head>  
        <body>
                <script type="application/json" id="__EZY_SSR_DATA__">
                    ${json}
                </script>
                <div id="root">${appString}</div>
                ${scriptTags}
        </body>
    </html>
  `;
};

export default createHtmlDoc;
