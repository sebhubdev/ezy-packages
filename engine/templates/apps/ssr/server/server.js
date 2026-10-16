import ssrServer from "@ezycore/engine/runtime/server/ssrServer";
import App from "../src/client/App";
import routes from "../src/routes/routes";

ssrServer(App, routes);
