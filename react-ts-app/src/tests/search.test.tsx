import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SearchBlock from "../components/search block/search";
import { PostsContext, SearchContext } from "../components/constext/context";
import { vi } from "vitest";

vi.mock("../components/API/getPlanets");
vi.mock("../components/API/getPage");
// vi.mock('../components/context/context');

const mockUsePostsContext = {
  posts: [],
  setPosts: vi.fn(),
};

const mockUseSearchContext = {
  search: "",
  setSearch: vi.fn(),
};

vi.mock("../components/context/context", () => ({
  usePostsContext: vi.fn(() => mockUsePostsContext),
  useSearchContext: vi.fn(() => mockUseSearchContext),
}));

describe("SearchBlock Component", () => {
  beforeEach(() => {
    // const mockUsePostsContext = {
    //   posts: [],
    //   setPosts: vi.fn(),
    // };

    // const mockUseSearchContext = {
    //   search: '',
    //   setSearch: vi.fn(),
    // };

    // vi.mock('../components/context/context', () => ({
    //   usePostsContext: vi.fn(() => mockUsePostsContext),
    //   useSearchContext: vi.fn(() => mockUseSearchContext),
    // }));

    // Mock API functions
    // FindPlanet.mockResolvedValue([]);
    // getPage.mockResolvedValue([]);
    vi.mock("../components/API/getPlanets", () => ({
      FindPlanet: vi.fn().mockResolvedValue([]),
      getPage: vi.fn().mockResolvedValue([]),
    }));
  });

  test("renders SearchBlock component", () => {
    const setSearch = vi.fn();
    const setPosts = vi.fn();
    render(
      <BrowserRouter>
        <SearchContext.Provider value={{ search: "", setSearch }}>
          <PostsContext.Provider value={{ posts: [], setPosts }}>
            <SearchBlock />
          </PostsContext.Provider>
        </SearchContext.Provider>
      </BrowserRouter>,
    );

    // Add your assertions based on your component's expected initial state
    // For example:
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("handles form submission and updates state", async () => {
    const setSearch = vi.fn();
    const setPosts = vi.fn();
    render(
      <BrowserRouter>
        <SearchContext.Provider value={{ search: "", setSearch }}>
          <PostsContext.Provider value={{ posts: [], setPosts }}>
            <SearchBlock />
          </PostsContext.Provider>
        </SearchContext.Provider>
      </BrowserRouter>,
    );

    // Simulate user input and form submission
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    const submitButton = screen.getByText("send");
    fireEvent.click(submitButton);

    // Wait for async operations to complete
    await act(async () => {});

    // Add your assertions based on the expected state after form submission
    // For example:
    expect(screen.getByText("No Data About Your Search")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
