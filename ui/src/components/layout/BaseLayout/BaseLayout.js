import React, { createContext, useState, useEffect, useRef } from "react";
import BackToTop from "@ezycore/ui/src/components/molecules/BackToTop";
import CookiesBanner from "@ezycore/ui/src/components/organisms/CookiesBanner";
import Header from "@ezycore/ui/src/components/layout/Header/Header";
import Footer from "@ezycore/ui/src/components/layout/Footer/Footer";
import Loading from "@ezycore/ui/src/components/molecules/Loading";
import DebugBar from "@ezycore/runtime/src/devtools/DebugBar";

const LayoutContext = createContext();

const LayoutProvider = LayoutContext.Provider;

const BaseLayout = ({
  userData,
  setUserData,
  globalData,
  layoutData,
  children,
  loading,
}) => {
  const headerHeight = 135;
  layoutData.headerHeight = headerHeight;

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

  if (!globalData) return;

  return (
    <>
      <LayoutProvider value={layoutData}>
        <div className="base-layout" ref={layoutRef} onScroll={handleScroll}>
          <Header
            userData={userData}
            setUserData={setUserData}
            nav={globalData?.menu?.main}
          />
          <div className={`base-layout__content`}>
            {loading ? <Loading /> : children}
            <BackToTop container={layoutRef} isVisible={isBackToTopVisible} />
          </div>
          <Footer />
          <CookiesBanner />
          <DebugBar />
        </div>
      </LayoutProvider>
    </>
  );
};

export default BaseLayout;

export { LayoutContext };
