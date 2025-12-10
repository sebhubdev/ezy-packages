import React, { use } from "react";
import Icon from "@ezycore/ui/src/components/atoms/Icon";
import { Link } from "react-router-dom";

export interface PageActionsProps {}

function PageActions({}: PageActionsProps) {
  return (
    <div className="page-actions mb-6 ">
      <div className="page-actions__inner py-4 px-10 d-flex justify-between">
        <div>
          <Link to="/" className="page-actions__item">
            <Icon icon="back" />
          </Link>
        </div>

        <div>
          <Link to={`/`} className="page-actions__item">
            <Icon icon="edit" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageActions;
