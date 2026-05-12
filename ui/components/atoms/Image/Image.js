import React from "react";

const Image = ({ image, id }) => {
  if (!image) return;
  const { url: src, alt } = image;
  return <img id={id} src={src} alt={alt} />;
};

export default Image;
