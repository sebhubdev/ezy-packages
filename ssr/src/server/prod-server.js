import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getGlobalData from "@ezycore/utils/getGlobalData";
import makeApp from "./makeApp";
import path from "path";

const prodServer = (App, port, routes) => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/statics",
    express.static(path.resolve(process.cwd(), "build/statics"))
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
            .request()
            .then((data) => {
              initialData.pageData = data;
            })
            .catch((err) => {
              isError = true;
            });
        } else {
          res.redirect(`/not-found/`);
          isError = true;
        }
      }

      if (isError) return;

      const app = makeApp(App, initialData, req.url);
      res.send(app);
    });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

export default prodServer;
