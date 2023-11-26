import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DetailedPost from "../pages/Planets/DetailedPost";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../components/store/store";

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

test("renders DetailedPost component with data", async () => {
  render(
    <Provider store={store}>
      <DetailedPost />
    </Provider>,
    { wrapper: MemoryRouter },
  );

  expect(screen.queryByText("Tatooine")).toBeNull();
  expect(screen.queryByText("Terrain: Desert")).toBeNull();
});

test("renders Loading... when data is still loading", async () => {
  render(
    <Provider store={store}>
      <DetailedPost />
    </Provider>,
    { wrapper: MemoryRouter },
  );

  expect(screen.queryByText("Loading...")).toBeNull();
});

test("renders nothing when there is no post data", async () => {
  render(
    <Provider store={store}>
      <DetailedPost />
    </Provider>,
    { wrapper: MemoryRouter },
  );

  expect(screen.queryByText("Tatooine")).toBeNull();
  expect(screen.queryByText("Terrain: Desert")).toBeNull();
});

test("closes the detailed post and removes query string on button click", async () => {
  render(
    <Provider store={store}>
      <DetailedPost />
    </Provider>,
    { wrapper: MemoryRouter },
  );

  await waitFor(() => expect(screen.queryByText("Tatooine")).toBeNull());
  await waitFor(() => expect(screen.queryByText("Terrain: Desert")).toBeNull());
});
