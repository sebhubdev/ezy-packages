import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import resolveRequest from "@ezycore/runtime/src/commons/resolveRequest";
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
    () => resolveRequest(pathname, routes),
    [pathname, routes],
  );

  useEffect(() => {
    console.log("route", route);
  }, [route]);

  const match = useMatch(route?.path || "/__no_match__");
  const params = match?.params;

  const getPageData = async () => {
    if (!route) {
      navigate(`/not-found/`);
      setPageData({});
      return;
    }

    if (!route.needRequest) {
      setPageData({});
      return;
    }

    if (!route.request) {
      navigate(`/not-found/`);
      setPageData({});
      return;
    }

    try {
      const data = await route.request(params);
      setPageData(data);
    } catch {
      setPageData({});
    }
  };

  useEffect(() => {
    setLoading(true);
    setActualPath(pathname);
    getPageData().finally(() => setLoading(false));
  }, [pathname]);

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

  return { pageData, globalData, loading, actualPath, currentLang, pathname };
};

export default useGetAppData;
