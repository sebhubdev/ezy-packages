import React from "react";
import { BaseLayout } from "@ezycore/ui/components/layout";
import useGetAppData from "@ezycore/engine/runtime/commons/useGetAppData";
import RouterCreator from "@ezycore/engine/runtime/router/RouterCreator";
import routes from "../routes/routes";

const App = ({ initialData }) => {
  const { pageResponse, loading } = useGetAppData({ initialData, routes });
  return (
    <BaseLayout loading={loading}>
      <RouterCreator routes={routes} pageResponse={pageResponse} />
    </BaseLayout>
  );
};
export default App;
