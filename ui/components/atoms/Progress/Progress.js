import React from "react";
import classNames from "classnames";

function Progress({ progress = 60, isActive = true, readingTime = 2 }) {
  const classes = classNames({
    progress: true,
    active: isActive,
  });
  return (
    <div className={classes}>
      <div className="progress__inner">
        <div className="progress__info">
          Reading time : <span>{readingTime} min</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar__inner"
            style={{ width: `${progress || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
