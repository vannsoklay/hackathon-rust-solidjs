import { Component } from "solid-js";
import { useRoutes } from "@solidjs/router";
import { router } from "./utils/router";
import { AppProvider } from "./middleware/useAuth";

const App: Component = () => {
  const Entry = useRoutes(router);
  return (
    <AppProvider>
      <Entry />
    </AppProvider>
  );
};

export default App;
