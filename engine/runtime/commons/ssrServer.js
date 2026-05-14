import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import renderSsrApp from "./renderSsrApp";
import path from "path";
import cookieParser from "cookie-parser";

const ssrServer = (App, routes, globalLoader) => {
  console.log("APP_PATH", APP_PATH);
  console.log("pdw", process.cwd());

  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const staticsPath =
    process.env.REMOTE == "true"
      ? path.resolve(process.cwd(), "client/statics")
      : path.resolve(APP_PATH, "build/client/statics");

  app.use("/statics", express.static(staticsPath));

  console.log("REMOTE:", process.env.REMOTE);
  console.log("cwd:", process.cwd());
  console.log("APP_PATH:", APP_PATH);
  console.log("staticsPath:", staticsPath);

  routes.map((route) => {
    app.get(route.path, async (req, res) => {
      let isError = false;
      const params = req.params;
      const initialData = {};
      initialData.globalResponse = await globalLoader({ req });
      initialData.path = req.originalUrl;

      let errors = false;

      if (!route.loader) {
        initialData.pageResponse = {
          data: null,
          status: 200,
          error: null,
        };
      }

      if (route.loader) {
        await route
          .loader({ params })
          .then((data) => {
            initialData.pageResponse = data;
          })
          .catch((error) => {
            initialData.pageResponse = {
              data: null,
              status: error.response.status,
              error: error.response.data,
            };
          });
      }
      const app = renderSsrApp(App, initialData, req.url);
      res.send(app);
    });
  });

  app.use("*", async (req, res) => {
    const initialData = {};
    initialData.pageResponse = {
      data: null,
      status: 404,
      error: "Page not found",
    };
    initialData.globalResponse = await globalLoader({ req });
    initialData.path = req.originalUrl;
    const app = renderSsrApp(App, initialData, req.url);
    res.send(app);
  });

  const port = process.env.PORT || 3002;

  app.listen(port, () => {
    console.log(`Server is listening on port in ssrServer ${port}`);
  });
};

export default ssrServer;
