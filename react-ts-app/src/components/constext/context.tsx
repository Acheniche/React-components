import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { FindPlanetResponse } from "../../App";

export type PostsContext = {
  posts: FindPlanetResponse[] | undefined;
  setPosts: Dispatch<SetStateAction<FindPlanetResponse[] | undefined>>;
};

export type SearchContext = {
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
};

export const PostsContext = createContext<PostsContext | undefined>(undefined);

export const SearchContext = createContext<SearchContext | undefined>(
  undefined,
);

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    console.log(context);
    throw new Error("Error");
  }
  return context;
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    console.log(context);
    throw new Error("Error");
  }
  return context;
}
