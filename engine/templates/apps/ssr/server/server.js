import ssrServer from "@ezycore/engine/runtime/commons/ssrServer";
import App from "../src/client/App";
import routes from "../src/routes/routes";

ssrServer(App, routes);
