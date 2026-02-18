// useGetAppData.js
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import resolveRouteMatch from "@ezycore/runtime/src/router/resolveRouteMatch";
import langs from "@ezycore/i18n/src/langs.json";

const makeResponse = (data = null) => ({
  data,
  status: 200,
  error: null,
  loading: false,
});

const useGetAppData = ({ initialData, routes, isSSR, globalLoader }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [globalResponse, setGlobalResponse] = useState(() =>
    makeResponse(isSSR ? (initialData?.globalData ?? null) : null),
  );

  const [pageResponse, setPageResponse] = useState(() =>
    makeResponse(isSSR ? (initialData?.pageData ?? null) : null),
  );

  const [currentPath, setCurrentPath] = useState(() =>
    isSSR ? (initialData?.path ?? pathname) : pathname,
  );

  const route = useMemo(
    () => resolveRouteMatch(pathname, routes),
    [pathname, routes],
  );

  const match = useMatch(route?.path || "/__no_match__");
  const params = match?.params;

  useEffect(() => {
    if (isSSR) return;

    setGlobalResponse((prev) => ({ ...prev, loading: true, error: null }));

    (async () => {
      try {
        console.log("in first effect globalResponse");
        const data = await globalLoader();
        console.log("in first effect globalResponse", data);

        setGlobalResponse({ ...data, loading: false });
      } catch (error) {
        setGlobalResponse({ data: null, status: 500, error, loading: false });
      }
    })();
  }, [isSSR]);

  useEffect(() => {
    if (globalResponse.loading) return;

    setPageResponse((prev) => ({ ...prev, loading: true, error: null }));

    setCurrentPath(pathname);

    (async () => {
      if (!route) {
        setPageResponse({
          data: null,
          status: 404,
          error: null,
          loading: false,
        });
        return;
      }

      if (!route.loader) {
        setPageResponse({
          data: null,
          status: 200,
          error: null,
          loading: false,
        });
        return;
      }

      try {
        const result = await route.loader({
          params,
          globalData: globalResponse.data,
        });

        setPageResponse({ ...result, loading: false });
      } catch (error) {
        setPageResponse({ data: null, status: 500, error, loading: false });
      }
      setLoading(false);
    })();
  }, [pathname, route, params, globalResponse.data, globalResponse.loading]);

  console.log("in the end", pageResponse);

  return {
    globalResponse,
    pageResponse,
    currentPath,
    pathname,
    route,
    params,
    loading,
  };
};

export default useGetAppData;
