import React, { useState, useEffect, useMemo } from "react";
const getCssBreakpoints = () => {
  if (IS_SSR) return {};

  const styles = getComputedStyle(document.documentElement);

  return {
    xxs: parseInt(styles.getPropertyValue("--bp-xxs")),
    xs: parseInt(styles.getPropertyValue("--bp-xs")),
    sm: parseInt(styles.getPropertyValue("--bp-sm")),
    md: parseInt(styles.getPropertyValue("--bp-md")),
    lg: parseInt(styles.getPropertyValue("--bp-lg")),
    xl: parseInt(styles.getPropertyValue("--bp-xl")),
    xxl: parseInt(styles.getPropertyValue("--bp-xxl")),
  };
};

const useBreakpoint = () => {
  const isBrowser = typeof window !== "undefined";

  const breakpoints = getCssBreakpoints();

  const [size, setSize] = useState(() => ({
    w: isBrowser ? window.innerWidth : 0,
    h: isBrowser ? window.innerHeight : 0,
  }));

  const getBp = (w) => {
    let current = "xs";
    for (const [name, min] of Object.entries(breakpoints)) {
      if (w >= min) current = name;
    }
    return current;
  };

  useEffect(() => {
    if (IS_SSR) return;

    const onResize = () => {
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isBrowser]);

  const bp = useMemo(() => getBp(size.w), [size.w]);

  return { ...size, bp };
};

export default useBreakpoint;
