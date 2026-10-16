import React from "react";
import { BaseLayout } from "@ezycore/ui/components/layout";
import useGetAppData from "@ezycore/engine/runtime/data/useGetAppData";
import RouterCreator from "@ezycore/engine/runtime/router/RouterCreator";
import routes from "../routes/routes";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

const App = ({ initialData }) => {
  const { pageResponse, loading } = useGetAppData({ initialData, routes });
  return (
    <BaseLayout className="ezy-layout" header={<Header />} footer={<Footer />} loading={loading}>
      <RouterCreator routes={routes} pageResponse={pageResponse} />
    </BaseLayout>
  );
};
export default App;
