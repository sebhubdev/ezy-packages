import React from "react";
import LoadingIcon from "@ezycore/ui/src/components/atoms/LoadingIcon";

const Loading = () => {
  return (
    <div className="loading">
      <LoadingIcon />
      <span className="loading__msg">Loading...</span>
    </div>
  );
};

export default Loading;
