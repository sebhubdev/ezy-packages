import React from "react";

export interface ImageProps {
  id?: string;
  image: string;
  alt?: string;
}

function Image({ id, image, alt }: ImageProps) {
  return (
    <div className="image">
      <img id={id} src={image} alt={alt} />
    </div>
  );
}

export default Image;
