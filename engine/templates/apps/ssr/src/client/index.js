import App from "./App";
import "../assets/styles/index.scss";
import createRoot from "@ezycore/engine/runtime/commons/createRoot";

createRoot(App);
if (module.hot) module.hot.accept();
