import React from "react";
import { Helmet } from "react-helmet";

const BaseHelmet = ({ meta }) => {
  const name = process.env.COMPANY_NAME;
  const pageTitle = `${name} | ${meta.title}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={meta.description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={meta.type} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default BaseHelmet;
