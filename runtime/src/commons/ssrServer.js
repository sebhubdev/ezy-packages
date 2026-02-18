import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getGlobalData from "@ezycore/utils/src/getGlobalData";
import renderSsrApp from "./renderSsrApp";
import path from "path";

const ssrServer = (App, port, routes) => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/statics",
    express.static(path.resolve(process.env.APP_PATH, "build/client/statics")),
  );

  routes.map((route) => {
    app.get(route.path, async (req, res) => {
      let isError = false;
      const params = req.params;
      const initialData = {};
      initialData.globalData = await getGlobalData();
      initialData.pageData = {};

      if (route.needRequest) {
        if (route.request) {
          await route
            .request(params)
            .then((data) => {
              console.log(data);

              // initialData.pageData = data;
            })
            .catch((err) => {
              console.log(err);

              isError = true;
            });
        } else {
          res.redirect(`/not-found/`);
          isError = true;
        }
      }

      if (isError) {
        return res.status(500).send("SSR error");
      }
      const app = renderSsrApp(App, initialData, req.url);
      res.send(app);
    });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

export default ssrServer;
