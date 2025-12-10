import React, { useContext } from "react";
import * as prismicH from "@prismicio/helpers";
import parse from "html-react-parser";
import { useLinkResolver } from "@ezycore/hooks/src";

const RichText = ({ content, type = "html" }) => {
  return (
    <>
      {type === "text" ? (
        parse(prismicH.asText(content))
      ) : (
        <div className="richtext">
          {parse(prismicH.asHTML(content, useLinkResolver))}
        </div>
      )}
    </>
  );
};

export default RichText;
