// useGetAppData.js
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import resolveRouteMatch from "@ezycore/runtime/src/router/resolveRouteMatch";

const makeResponse = (data = null) => ({
  data,
  status: 200,
  error: null,
  loading: false,
});

const useGetAppData = ({ initialData, routes, isSSR, globalLoader }) => {
  const firstHydrateSkipped = useRef(false);
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [globalResponse, setGlobalResponse] = useState(
    isSSR ? initialData?.globalResponse : makeResponse(),
  );

  const [pageResponse, setPageResponse] = useState(
    isSSR ? initialData?.pageResponse : makeResponse(),
  );

  const [currentPath, setCurrentPath] = useState(null);

  const route = useMemo(
    () => resolveRouteMatch(pathname, routes),
    [pathname, routes, currentPath],
  );

  const match = useMatch(route?.path || "/__no_match__");
  const params = match?.params;

  useEffect(() => {
    if (isSSR) return;

    setGlobalResponse((prev) => ({ ...prev, loading: true, error: null }));

    (async () => {
      try {
        const data = await globalLoader();

        setGlobalResponse({ ...data, loading: false });
      } catch (error) {
        console.log(error);
        setGlobalResponse({ data: null, status: 500, error, loading: false });
      }
    })();
  }, [isSSR]);

  useEffect(() => {
    setCurrentPath(pathname);
    if (initialData?.path === pathname && !firstHydrateSkipped.current) {
      firstHydrateSkipped.current = true;
      setLoading(false);
      return;
    }
    if (currentPath === pathname) return;
    setLoading(true);

    if (globalResponse.loading) return;

    setPageResponse((prev) => ({ ...prev, loading: true, error: null }));

    (async () => {
      if (!route) {
        setPageResponse({
          data: null,
          status: 404,
          error: "Page not found",
          loading: false,
        });
        setLoading(false);
        return;
      }

      if (!route.loader) {
        setPageResponse({
          data: null,
          status: 200,
          error: null,
          loading: false,
        });
        setLoading(false);
        return;
      }

      try {
        const result = await route.loader({
          params,
          globalData: globalResponse.data,
        });

        setPageResponse({ ...result, loading: false });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setPageResponse({ data: null, status: 500, error, loading: false });
        setLoading(false);
      }
    })();
  }, [pathname, route, params, globalResponse.data, globalResponse.loading]);

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
