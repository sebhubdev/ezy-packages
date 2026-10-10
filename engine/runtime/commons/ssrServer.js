import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import renderSsrApp from "./renderSsrApp";
import path from "path";
import cookieParser from "cookie-parser";
import { matchPath } from "react-router-dom";
import resolveRouteMatch from "../router/resolveRouteMatch";
import resolveLoader from "../requests/resolveLoader";
import normalizeError from "../errors/normalizeError";

const ssrServer = (App, routes, globalLoader) => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const staticsPath =
    REMOTE == "true"
      ? "client/statics"
      : path.resolve(APP_PATH, "build/client/statics");
  app.use("/statics", express.static(staticsPath));
  const publicPath = REMOTE == "true"
    ? "client/public"
    : path.resolve(APP_PATH, "build/client/public");
  app.use(express.static(publicPath));

  app.get("*", async (req, res, next) => {
    try {
      const route = resolveRouteMatch(req.path, routes);
      const params = route
        ? matchPath(
            { path: route.path, caseSensitive: route.caseSensitive },
            req.path,
          )?.params || {}
        : {};
      const query = Object.fromEntries(
        new URL(req.originalUrl, "http://ssr.local").searchParams,
      );
      const context = { req, params, query };
      const globalResponse = await resolveLoader(globalLoader, context);
      const pageResponse =
        globalResponse.status >= 400
          ? globalResponse
          : !route
            ? { data: null, status: 404, error: { message: "Page not found" } }
            : await resolveLoader(route.loader, context);
      const initialData = {
        globalResponse,
        pageResponse,
        path: req.originalUrl,
      };
      const html = renderSsrApp(App, initialData, req.originalUrl);
      const status = Number(pageResponse.status);
      res
        .status(
          Number.isInteger(status) && status >= 200 && status <= 599
            ? status
            : 500,
        )
        .send(html);
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const response = normalizeError(error);
    const status = Number(response.status);
    res.status(
      Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500,
    );
    res.type("text/plain").send("Unable to render the page");
  });

  const port = process.env.PORT || 3002;
  return app.listen(port, () => {
    console.log(`Server is listening on port in ssrServer ${port}`);
  });
};

export default ssrServer;
