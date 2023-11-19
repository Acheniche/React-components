import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { planetsAPI } from "../components/API/getPlanets";
import DetailedPost from "../components/Posts/DetailPost";
import { vi } from "vitest";

vi.mock("../API/getPlanets", () => ({
  planetsAPI: {
    useFetchSearchPlanetsQuery: vi.fn(),
  },
}));

describe("DetailedPost component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hides component when there is no data", async () => {
    const mockUseFetchSearchPlanetsQuery = vi.fn();
    mockUseFetchSearchPlanetsQuery.mockResolvedValue({
      data: null,
      isLoading: false,
    });
    planetsAPI.useFetchSearchPlanetsQuery = mockUseFetchSearchPlanetsQuery;

    const { queryByText } = render(
      <Router>
        <DetailedPost />
      </Router>,
    );

    expect(queryByText("Loading...")).toBeNull();
    expect(queryByText("TestPlanet")).toBeNull();
    expect(queryByText("Terrain: TestTerrain")).toBeNull();
  });
});
