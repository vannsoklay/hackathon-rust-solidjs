import { Component, createSignal } from "solid-js";
import { useRoutes, Link } from "@solidjs/router";
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
