const cleanErrorMessage = (message = "") => {
  let msg = String(message);

  msg = msg
    .replace(/_+webpack_imported_module_\d+(_+)?/gi, "")
    .replace(/__WEBPACK_IMPORTED_MODULE_\d+__/g, "")
    .replace(/\.default\./g, ".")
    .replace(/\.default\b/g, "")
    .replace(/\bdefault\./g, "");

  msg = msg
    .replace(
      /(?:^|[\s:])(?:_?services|_?modules|_?api|_?utils)[^ ]*\.(\w+(?:\.\w+)+)\s+(is not a function.*)$/i,
      " $1 $2",
    )
    .trim();

  msg = msg.split("\n")[0].trim();

  msg = msg.replace(/\s+/g, " ").trim();

  return msg || "Unknown error";
};

export default cleanErrorMessage;
