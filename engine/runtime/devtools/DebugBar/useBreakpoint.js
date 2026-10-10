import { useState, useEffect } from "react";
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
  // The first client render must match the server before reading the viewport.
  const [size, setSize] = useState({ w: 0, h: 0, bp: "xs" });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      let bp = "xs";
      for (const [name, min] of Object.entries(getCssBreakpoints())) {
        if (w >= min) bp = name;
      }
      setSize({ w, h: window.innerHeight, bp });
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
};

export default useBreakpoint;
