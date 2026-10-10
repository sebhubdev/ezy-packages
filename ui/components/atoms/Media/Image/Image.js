import React from "react";

function Image({ id, image, alt }) {
  return (
    <div className="image">
      <img id={id} src={image} alt={alt} />
    </div>
  );
}

export default Image;
