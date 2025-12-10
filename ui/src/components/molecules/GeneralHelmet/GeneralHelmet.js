import React from "react";
import { Helmet } from "react-helmet";

const GeneralHelmet = ({ meta }) => {
  const name = process.env.COMPANY_NAME;
  const { title, description, type } = meta;
  const pageTitle = `${name}${title ? ` | ${title}` : ""}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default GeneralHelmet;
