import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import ErrorBoundary from "./components/ErrorBoundary/Error";
import { Provider } from "react-redux";
import { setupStore } from "./components/store/store";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
