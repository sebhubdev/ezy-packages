import React, { createContext, useState, useEffect, useRef } from "react";
import BackToTop from "@ezycore/ui/components/molecules/BackToTop";
import CookiesBanner from "@ezycore/ui/components/organisms/CookiesBanner";
import Header from "@ezycore/ui/components/layout/Header/Header";
import Footer from "@ezycore/ui/components/layout/Footer/Footer";
import Loading from "@ezycore/ui/components/molecules/Loading";
import DebugBar from "@ezycore/engine/runtime/devtools/DebugBar";

const LayoutContext = createContext();

const LayoutProvider = LayoutContext.Provider;

const BaseLayout = ({
  userData,
  setUserData,
  globalData = {},
  layoutData = {},
  children,
  loading,
}) => {
  const headerHeight = 135;
  const contextData = { ...layoutData, headerHeight };

  const [layoutScroll, setLayoutScroll] = useState(0);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  const layoutRef = useRef(null);

  const handleScroll = () => {
    const scroll = layoutRef.current.scrollTop;
    setLayoutScroll(scroll);
  };

  useEffect(() => {
    setIsBackToTopVisible(layoutScroll > 200 ? true : false);
  }, [layoutScroll]);


  return (
    <>
      <LayoutProvider value={contextData}>
        <div className="base-layout" ref={layoutRef} onScroll={handleScroll}>
          <Header
            userData={userData}
            setUserData={setUserData}
            nav={globalData?.menu?.main}
          />
          <div className="base-layout__content" aria-busy={Boolean(loading)}>
            <div className="base-layout__page" inert={loading ? "" : undefined}>
              {children}
            </div>
            {loading && (
              <div
                className="base-layout__loading"
                role="status"
                aria-live="polite"
              >
                <Loading />
              </div>
            )}
            <BackToTop container={layoutRef} isVisible={isBackToTopVisible} />
          </div>
          <Footer />
          <CookiesBanner />
          {process.env.HIDE_DEBUG_BAR !== "true" && <DebugBar />}
        </div>
      </LayoutProvider>
    </>
  );
};

export default BaseLayout;

export { LayoutContext };
