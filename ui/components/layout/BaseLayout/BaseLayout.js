import React, { createContext, useRef, useState } from "react";
import BackToTop from "@ezycore/ui/components/molecules/BackToTop";
import Loading from "@ezycore/ui/components/molecules/Loading";

const LayoutContext = createContext({});

const BaseLayout = ({
  header,
  footer,
  extras,
  backToTop = false,
  headerHeight = 0,
  layoutData = {},
  className = "",
  children,
  loading = false,
}) => {
  const layoutRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const contextData = { ...layoutData, headerHeight };

  return (
    <LayoutContext.Provider value={contextData}>
      <div
        className={`base-layout${className ? ` ${className}` : ""}`}
        ref={layoutRef}
        onScroll={backToTop ? (event) => setScroll(event.currentTarget.scrollTop) : undefined}
      >
        {header}
        <div className="base-layout__content" aria-busy={Boolean(loading)}>
          <div className="base-layout__page" inert={loading ? "" : undefined}>
            {children}
          </div>
          {loading && (
            <div className="base-layout__loading" role="status" aria-live="polite">
              <Loading />
            </div>
          )}
          {backToTop && <BackToTop container={layoutRef} isVisible={scroll > 200} />}
        </div>
        {footer}
        {extras}
      </div>
    </LayoutContext.Provider>
  );
};
export default BaseLayout;
export { LayoutContext };
