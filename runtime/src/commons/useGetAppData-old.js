import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import resolveRouteMatch from "@ezycore/runtime/src//router/resolveRouteMatch";
import langs from "@ezycore/i18n/src/langs.json";
import getGlobalData from "@ezycore/runtime/src/commons/getGlobalData";

const useGetAppData = ({ initialData, routes, isSSR }) => {
  const [pageData, setPageData] = useState(isSSR ? initialData.pageData : null);

  const [globalData, setGlobalData] = useState(
    isSSR ? initialData.globalData : null,
  );
  const [loading, setLoading] = useState(false);
  const [actualPath, setActualPath] = useState(null);
  const [currentLang, setCurrentLang] = useState(
    isSSR ? initialData.lang : null,
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = "fr";

  const route = useMemo(
    () => resolveRouteMatch(pathname, routes),
    [pathname, routes],
  );

  useEffect(() => {
    // console.log("route", route);
  }, [route]);

  const match = useMatch(route?.path || "/__no_match__");
  const params = match?.params;

  const getPageData = async () => {
    console.log("getting data");

    if (!route) {
      navigate(`/not-found/`);
      setPageData({});
      return;
    }
    console.log("Route exist", route);

    if (!route.loader) {
      setPageData({});
      return;
    }
    console.log("Loader exist", route.loader);

    try {
      const data = await route.loader({ params });
      console.log("Loader exec", data);
      setPageData(data);
    } catch (err) {
      console.log(err);

      setPageData({});
    }
  };

  useEffect(() => {
    if (isSSR) return;

    setCurrentLang(langs[lang]);

    (async () => {
      try {
        const res = await getGlobalData();
        setGlobalData(res);
      } catch {
        setGlobalData({});
      }
    })();
  }, [isSSR]);

  useEffect(() => {
    setLoading(true);
    setActualPath(pathname);
    getPageData().finally(() => setLoading(false));
  }, [pathname]);

  return { pageData, globalData, loading, actualPath, currentLang, pathname };
};

export default useGetAppData;
