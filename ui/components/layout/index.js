import "./Layout.scss";
import BaseLayout from "./BaseLayout/BaseLayout";
import BaseHeader from "./BaseHeader/BaseHeader";
import BaseFooter from "./BaseFooter/BaseFooter";
import Page from "./Page/Page";

export { BaseLayout, BaseHeader, BaseFooter, Page };
// Compatibility names now expose structural bases only.
export { BaseHeader as Header, BaseFooter as Footer };
