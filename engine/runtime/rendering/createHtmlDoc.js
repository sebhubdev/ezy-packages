import { Helmet } from "react-helmet";
import renderHtmlDocument from "./renderHtmlDocument";

export default (initialData, appString, assets) =>
  renderHtmlDocument(initialData, appString, assets, APP_DOCUMENT, Helmet.renderStatic());
