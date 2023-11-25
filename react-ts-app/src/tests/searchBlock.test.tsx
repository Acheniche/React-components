import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBlock from "../components/search block/search";
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

vi.mock("../API/getPlanets", () => ({
  planetsAPI: {
    useFetchSearchPlanetsQuery: vi.fn(),
    useFetchPagePlanetsQuery: vi.fn(),
  },
}));

test("renders the search input and button", async () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <Provider store={store}>
        <SearchBlock />
      </Provider>
    </Router>,
  );

  const searchInput = getByPlaceholderText("Search...");
  const searchButton = getByText("send");

  expect(searchInput).toBeDefined();
  expect(searchButton).toBeDefined();
});

test("renders posts after submitting the search form", async () => {
  const { getByPlaceholderText, getByText, findByText } = render(
    <Router>
      <Provider store={store}>
        <SearchBlock />
      </Provider>
    </Router>,
  );

  const mockQueryResult = {
    data: {
      results: [
        { name: "TestName1", terrain: "TestTerrain1" },
        { name: "TestName2", terrain: "TestTerrain2" },
      ],
    },
    isLoading: false,
  };

  const useFetchSearchPlanetsQueryMock = vi
    .fn()
    .mockReturnValue(mockQueryResult);
  const useFetchPagePlanetsQueryMock = vi
    .fn()
    .mockReturnValue({ data: null, isLoading: false });
  vi.mock("../API/getPlanets", () => ({
    planetsAPI: {
      useFetchSearchPlanetsQuery: useFetchSearchPlanetsQueryMock,
      useFetchPagePlanetsQuery: useFetchPagePlanetsQueryMock,
    },
  }));

  const searchInput = getByPlaceholderText("Search...");
  const searchButton = getByText("send");

  fireEvent.change(searchInput, { target: { value: "TestSearch" } });

  await waitFor(() => {
    fireEvent.click(searchButton);
  });

  await waitFor(() => {
    const postNames = findByText(/TestName/);
    expect(postNames).toBeDefined();
  });
});
