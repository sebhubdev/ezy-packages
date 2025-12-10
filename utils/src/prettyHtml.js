const prettyHtml = (html) => {
  let indent = 0;
  const tab = "  ";
  return html
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => {
      if (/^<\/.+>/.test(line)) {
        indent = Math.max(indent - 1, 0);
      }
      const out = tab.repeat(indent) + line.trim();
      if (/^<[^!?/].*[^/]?>$/.test(line)) {
        indent++;
      }

      return out;
    })
    .join("\n");
};

export default prettyHtml;
