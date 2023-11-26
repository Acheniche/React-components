import React from "react";
import ErrorBoundary from "../components/ErrorBoundary/Error";
import { Provider } from "react-redux";
import { setupStore } from "../components/store/store";
import { App } from "../App";

const store = setupStore();

export default function Home({}) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
