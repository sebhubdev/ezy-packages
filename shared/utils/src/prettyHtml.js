const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const getTagName = (tag) => {
  // "<div ...>" -> "div"
  // "</div>" -> "div"
  // "<My-Comp>" -> "my-comp"
  const m = tag.match(/^<\/?\s*([a-zA-Z0-9-]+)/);
  return m ? m[1].toLowerCase() : "";
};

const isCommentLike = (token) =>
  /^<!\s*--/.test(token) ||
  /^<!DOCTYPE/i.test(token) ||
  /^<!\[CDATA\[/i.test(token);

const isClosingTag = (token) => /^<\/\s*[^>]+>/.test(token);

const isSelfClosingTag = (token) => /\/\s*>$/.test(token);

const isOpeningTag = (token) =>
  /^<\s*[^!?/][^>]*>$/.test(token) &&
  !isClosingTag(token) &&
  !isCommentLike(token);

const prettyHtml = (html, { tab = "  ", keepBlankText = false } = {}) => {
  let indent = 0;

  // Tokenize into tags and text chunks
  // e.g. "<div>hi<span>x</span></div>" -> ["<div>", "hi", "<span>", "x", "</span>", "</div>"]
  const tokens =
    (html || "")
      .replace(/\r\n?/g, "\n")
      .match(/<!--[\s\S]*?-->|<\/?[^>]+>|[^<]+/g) || [];

  const out = [];
  let inRawTextTag = null; // "script" or "style"

  for (let rawToken of tokens) {
    let token = rawToken;

    // Normalize whitespace in text nodes (optional)
    if (!token.startsWith("<")) {
      // text node
      const text = keepBlankText ? token : token.replace(/\s+/g, " ").trim();
      if (!text) continue;

      // if we are inside <script>/<style>, keep as-is (don’t crush formatting)
      const finalText = inRawTextTag ? token : text;

      // text lines can contain newlines; indent each line
      finalText.split("\n").forEach((line) => {
        const l = keepBlankText ? line : line.trim();
        if (!keepBlankText && !l) return;
        out.push(tab.repeat(indent) + l);
      });
      continue;
    }

    // tag token
    token = token.trim();

    // Handle raw-text tags
    const tagName = getTagName(token);
    if (inRawTextTag) {
      // Only end raw mode when we hit its closing tag
      out.push(tab.repeat(indent) + token);

      if (isClosingTag(token) && tagName === inRawTextTag) {
        inRawTextTag = null;
        // closing tag already printed at current indent; now reduce indent
        indent = Math.max(indent - 1, 0);
      }
      continue;
    }

    // Decrement BEFORE printing closing tags so they align with opening tags
    if (isClosingTag(token)) {
      indent = Math.max(indent - 1, 0);
      out.push(tab.repeat(indent) + token);
      continue;
    }

    // Comments / doctype: print at current level
    if (isCommentLike(token)) {
      out.push(tab.repeat(indent) + token);
      continue;
    }

    // Opening tag
    if (isOpeningTag(token)) {
      out.push(tab.repeat(indent) + token);

      const isVoid = VOID_TAGS.has(tagName);
      const selfClosing = isSelfClosingTag(token);

      // Enter raw-text mode for script/style (indent children but keep raw content)
      if ((tagName === "script" || tagName === "style") && !selfClosing) {
        // script/style contents should be indented one level, then closing tag aligns back
        indent += 1;
        inRawTextTag = tagName;
        continue;
      }

      // Only indent children if it's not void and not self-closing
      if (!isVoid && !selfClosing) indent += 1;

      continue;
    }

    // Fallback: unknown tag-ish token
    out.push(tab.repeat(indent) + token);
  }

  return out.join("\n");
};

export default prettyHtml;
