import { renderHook, act } from "@testing-library/react";
import {
  PostsContext,
  SearchContext,
  usePostsContext,
  useSearchContext,
} from "../components/constext/context";

describe("PostsContext", () => {
  it("should provide default values", () => {
    const { result } = renderHook(() => usePostsContext(), {
      wrapper: ({ children }) => (
        <PostsContext.Provider value={{ posts: undefined, setPosts: () => {} }}>
          {children}
        </PostsContext.Provider>
      ),
    });

    expect(result.current.posts).toBeUndefined();
    expect(typeof result.current.setPosts).toBe("function");
  });

  it("should update posts value", () => {
    const { result } = renderHook(() => usePostsContext(), {
      wrapper: ({ children }) => (
        <PostsContext.Provider value={{ posts: undefined, setPosts: () => {} }}>
          {children}
        </PostsContext.Provider>
      ),
    });

    act(() => {
      result.current.setPosts([{ name: "Earth" }]);
    });

    expect(result.current.posts).toEqual(undefined);
  });
});

describe("SearchContext", () => {
  it("should provide default values", () => {
    const { result } = renderHook(() => useSearchContext(), {
      wrapper: ({ children }) => (
        <SearchContext.Provider
          value={{ search: undefined, setSearch: () => {} }}
        >
          {children}
        </SearchContext.Provider>
      ),
    });

    expect(result.current.search).toBeUndefined();
    expect(typeof result.current.setSearch).toBe("function");
  });

  it("should update search value", () => {
    const { result } = renderHook(() => useSearchContext(), {
      wrapper: ({ children }) => (
        <SearchContext.Provider
          value={{ search: undefined, setSearch: () => {} }}
        >
          {children}
        </SearchContext.Provider>
      ),
    });

    act(() => {
      result.current.setSearch("Mars");
    });

    expect(result.current.search).toBe(undefined);
  });
});
