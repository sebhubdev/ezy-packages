import { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import resolveRouteMatch from "../router/resolveRouteMatch";
import resolveLoader from "../requests/resolveLoader";

const makeResponse = (data = null) => ({
  data,
  status: 200,
  error: null,
  loading: false,
});

const useGetAppData = ({ initialData, routes, globalLoader }) => {
  const { pathname, search } = useLocation();
  const fullPath = pathname + search;
  const hydratedPath = useRef(!SSR_DISABLED ? initialData?.path : null);
  const [globalResponse, setGlobalResponse] = useState(() =>
    !SSR_DISABLED && initialData?.globalResponse
      ? { ...initialData.globalResponse, loading: false }
      : { ...makeResponse(), loading: Boolean(globalLoader) },
  );
  const [pageResponse, setPageResponse] = useState(() =>
    !SSR_DISABLED && initialData?.pageResponse
      ? { ...initialData.pageResponse, loading: false }
      : makeResponse(),
  );
  const [loadedPath, setLoadedPath] = useState(hydratedPath.current);
  const lastPathRef = useRef(hydratedPath.current);
  const route = useMemo(
    () => resolveRouteMatch(pathname, routes),
    [pathname, routes],
  );
  const params = useMemo(
    () =>
      route
        ? matchPath(
            { path: route.path, caseSensitive: route.caseSensitive },
            pathname,
          )?.params || {}
        : {},
    [route, pathname],
  );
  const query = useMemo(
    () => Object.fromEntries(new URLSearchParams(search)),
    [search],
  );

  useEffect(() => {
    if (!SSR_DISABLED && initialData?.globalResponse) return;
    const controller = new AbortController();
    let active = true;
    setGlobalResponse((previous) => ({ ...previous, loading: true }));
    resolveLoader(globalLoader, {
      params: {},
      query,
      signal: controller.signal,
    }).then((response) => {
      if (active) setGlobalResponse({ ...response, loading: false });
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [globalLoader, initialData]);

  useEffect(() => {
    if (globalResponse.loading) return;
    // Keep skipping the hydrated path when StrictMode replays this effect.
    if (hydratedPath.current === fullPath) return;
    hydratedPath.current = null;
    const controller = new AbortController();
    let active = true;
    lastPathRef.current = fullPath;
    setPageResponse((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }));
    const load = async () => {
      const response =
        globalResponse.status >= 400
          ? { ...globalResponse, loading: false }
          : !route
            ? { data: null, status: 404, error: { message: "Page not found" } }
            : await resolveLoader(route.loader, {
                params,
                query,
                signal: controller.signal,
              });
      if (active) {
        setPageResponse({ ...response, loading: false });
        setLoadedPath(fullPath);
      }
    };
    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [fullPath, route, params, query, globalResponse]);

  return {
    globalResponse,
    pageResponse: {
      ...pageResponse,
      loading:
        globalResponse.loading ||
        pageResponse.loading ||
        loadedPath !== fullPath,
    },
    lastPath: lastPathRef.current,
    pathname: fullPath,
    route,
    params,
    query,
    loading:
      globalResponse.loading || pageResponse.loading || loadedPath !== fullPath,
  };
};

export default useGetAppData;
