import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import resolveRequest from "@ezycore/utils/src/resolveRequest";
import langs from "@ezycore/i18n/src/langs.json";
import getGlobalData from "@ezycore/utils/src/getGlobalData";

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

  const route = resolveRequest(pathname, routes);

  const match = useMatch(route.path);

  const params = match?.params;

  const getPageData = async () => {
    if (route.needRequest) {
      if (route.request) {
        await route
          .request(params)
          .then((data) => {
            setPageData(data);
          })
          .catch((err) => {
            setPageData({});
          });
      } else {
        navigate(`/not-found/`);
        setPageData({});
      }
    } else {
      setPageData({});
    }
  };

  useEffect(() => {
    setActualPath(pathname);
  }, []);

  useEffect(() => {
    setLoading(true);
    setActualPath(pathname);
    getPageData().then(() => {
      setLoading(false);
    });
    return;
  }, [pathname]);

  if (!isSSR) {
    useEffect(() => {
      setLoading(true);
      setCurrentLang(langs[lang]);
      getGlobalData().then((res) => {
        setGlobalData(res);
      });
      getPageData().then(() => {
        setLoading(false);
      });
    }, []);
  }

  return {
    pageData,
    globalData,
    loading,
    actualPath,
    currentLang,
    pathname,
  };
};

export default useGetAppData;
