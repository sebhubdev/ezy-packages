import React, { useRef, useState, useEffect } from "react";
import useBreakpoint from "@ezycore/runtime/src/devtools/DebugBar/useBreakpoint";

const DebugBar = ({}) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    setHeight(ref.current.clientHeight);
  }, []);

  const { w, h, bp } = useBreakpoint();

  return (
    <>
      <div className="debug-bar" ref={ref}>
        <div className="debug-bar__inner ctn ctn--lg">
          <ul className="debug-bar__items">
            <li>
              <strong>App type :</strong>
              {APP_TYPE.toUpperCase()}
            </li>
            <li>
              <strong>SSR disabled :</strong>
              {SSR_DISABLED.toString()}
            </li>
            <li>
              <strong>Env mode :</strong>
              {IS_DEV ? "development" : "production"}
            </li>
            <li>
              <strong>Breakpoint : {bp.toUpperCase()}</strong>
              {`${w}px/${h}px`}
            </li>
          </ul>
        </div>
      </div>
      <div className="debug-bar__spacer" style={{ height: height }}></div>
    </>
  );
};

export default DebugBar;
