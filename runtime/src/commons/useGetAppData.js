// useGetAppData.js
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import resolveRouteMatch from "@ezycore/runtime/src/router/resolveRouteMatch";
import normalizeError from "@ezycore/runtime/src/errors/normalizeError";
import resolveRequest from "@ezycore/runtime/src/requests/resolveRequest";

const makeResponse = (data = null) => ({
  data,
  status: 200,
  error: null,
  loading: false,
});

const useGetAppData = ({ initialData, routes, globalLoader }) => {
  const firstHydrateSkipped = useRef(false);
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [globalResponse, setGlobalResponse] = useState(
    !SSR_DISABLED ? initialData?.globalResponse : makeResponse(),
  );

  const [pageResponse, setPageResponse] = useState(
    !SSR_DISABLED ? initialData?.pageResponse : makeResponse(),
  );

  const lastPathRef = useRef(null);

  const route = useMemo(
    () => resolveRouteMatch(pathname, routes),
    [pathname, routes],
  );

  const match = useMatch(route?.path || "/__no_match__");
  const params = match?.params;

  useEffect(() => {
    if (!SSR_DISABLED || globalResponse.data) return;

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
  }, []);

  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    if (initialData?.path === pathname && !firstHydrateSkipped.current) {
      firstHydrateSkipped.current = true;
      setLoading(false);
      return;
    }
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
        });

        console.log(result);

        setPageResponse({ ...result, loading: false });
        setLoading(false);
      } catch (error) {
        console.log(normalizeError(error));
        setPageResponse({ ...normalizeError(error), loading: false });
        setLoading(false);
      }
    })();
  }, [pathname, route, params, globalResponse.data, globalResponse.loading]);

  return {
    globalResponse,
    pageResponse,
    lastPath: lastPathRef.current,
    pathname,
    route,
    params,
    loading: loading || lastPathRef.current !== pathname,
  };
};

export default useGetAppData;
