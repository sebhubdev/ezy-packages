const renderHtmlDocument = (initialData, appString, assets, options, helmet) => {
  const { scriptTags = "", linkTags = "", styleTags = "" } = assets || {};
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const lang = escape(options.lang);

  const title = helmet?.title?.toString() || "";
  const hasTitle = !/^<title[^>]*><\/title>$/.test(title) && title;
  const json = JSON.stringify(initialData ?? null)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return `
    <!DOCTYPE html>
    <html lang="${lang}" data-theme="${escape(options.theme)}">
        <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1">
                <meta name="mobile-web-app-capable" content="yes">
                <meta charset="utf-8">
                <meta name="theme-color" content="${escape(options.themeColor)}">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <link rel="shortcut icon" href="${escape(options.favicon)}">
                ${hasTitle ? title : `<title>${escape(options.title)}</title>`}
                ${helmet?.meta?.toString() || ""}
                ${helmet?.link?.toString() || ""}
                ${helmet?.script?.toString() || ""}
                ${linkTags}
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

module.exports = renderHtmlDocument;
