import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SearchBlock from "../components/search block/search";
import { vi } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "../components/store/store";
import { App } from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

export const fullRoutesConfig = [
  {
    path: "/",
    element: <App />,
  },
];

const store = setupStore();

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));
vi.mock("../API/getPlanets", () => ({
  planetsAPI: {
    useFetchSearchPlanetsQuery: vi.fn(),
    useFetchPagePlanetsQuery: vi.fn(),
  },
}));
vi.mock("../hooks/redux", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));
vi.mock("../store/redusers/searchSlice", () => ({
  searchSlice: {
    actions: {
      setSearch: vi.fn(),
    },
  },
}));
vi.mock("../store/redusers/pageSlice", () => ({
  pageSlice: {
    actions: {
      setPage: vi.fn(),
    },
  },
}));

describe("SearchBlock component", () => {
  test("404 page is displayed when navigating to an invalid route", () => {
    const router = createMemoryRouter(fullRoutesConfig, {
      initialEntries: ["/badAdress"],
    });
    render(<RouterProvider router={router} />);
    const message = screen.getByText("404 Not Found");
    expect(message).toBeDefined();
  });

  test("renders SearchBlock component", () => {
    render(
      <Provider store={store}>
        <SearchBlock />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("handles form submission and updates state", async () => {
    const mockSearch = "Test Search";

    render(
      <Provider store={store}>
        <SearchBlock />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: mockSearch } });
    fireEvent.submit(screen.getByRole("button", { name: "send" }));

    await act(async () => {});

    expect(screen.queryByText("Planet 1")).toBeNull();
  });
});
