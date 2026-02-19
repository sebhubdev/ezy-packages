import React from "react";
import Image from "@ezycore/ui/src/components/atoms/Media/Image";
import { Link } from "@ezycore/ui/src/components/atoms/Btn";

const BaseErrorLayout = ({ error, image }) => {
  return (
    <div className="error-layout">
      <div className="error-layout__inner ctn ctn--sm">
        {image && (
          <div className="error-layout__image">
            <Image image={image} />
          </div>
        )}
        {error && <div className="error-layout__message h1">{error}</div>}
        <div className="error-layout__actions text-center mt-6">
          <Link className="px-6" to="/">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseErrorLayout;
