/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { createClient, Provider } from "solid-urql";

import "./index.css";
import App from "./App";

const client = createClient({
  url: "http://localhost:8000",
  fetchOptions: {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  },
});

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Provider value={client}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  root!
);
