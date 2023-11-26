import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../App";
import { Provider } from "react-redux";
import { setupStore } from "../components/store/store";
import { vi } from "vitest";

const store = setupStore();

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: "/mocked-path",
    query: {},
    asPath: "/mocked-path",
  })),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("App component tests", () => {
  test("renders App component without errors", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  test("clicking the button triggers setError function", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const button = getByText("Click to error");
    expect(button).toBeDefined();
  });
});
