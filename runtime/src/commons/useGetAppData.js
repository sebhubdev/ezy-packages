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

const useGetAppData = ({ initialData, routes, globalLoader }) => {
  console.log("SSR_DISABLED", SSR_DISABLED);

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

  console.log("in get appdata end ");

  useEffect(() => {
    console.log("in effect global 1");

    if (!SSR_DISABLED || globalResponse.data) return;

    setGlobalResponse((prev) => ({ ...prev, loading: true, error: null }));
    console.log("in effect global 2");

    (async () => {
      try {
        const data = await globalLoader();

        setGlobalResponse({ ...data, loading: false });
        console.log("in effect global 3");
      } catch (error) {
        console.log(error);
        setGlobalResponse({ data: null, status: 500, error, loading: false });
        console.log("in effect global 4");
      }
    })();
  }, []);

  useEffect(() => {
    console.log("iin effect page 1");
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    if (initialData?.path === pathname && !firstHydrateSkipped.current) {
      firstHydrateSkipped.current = true;
      setLoading(false);
      return;
    }
    setLoading(true);
    console.log("iin effect page 2");

    if (globalResponse.loading) return;

    setPageResponse((prev) => ({ ...prev, loading: true, error: null }));
    console.log("iin effect page 3");

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
      console.log("iin effect page 4");

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

      console.log("iin effect page 5");
      try {
        const result = await route.loader({
          params,
        });

        setPageResponse({ ...result, loading: false });
        setLoading(false);
        console.log("iin effect page 6");
      } catch (error) {
        console.log(error);
        setPageResponse({ data: null, status: 500, error, loading: false });
        setLoading(false);
        console.log("iin effect page 7");
      }
    })();
  }, [pathname, route, params, globalResponse.data, globalResponse.loading]);

  console.log("in get appdata end ");
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
