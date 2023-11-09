import React, { useState } from "react";
import "./App.css";
import SearchBlock from "./components/search block/search";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailedPost from "./components/Posts/DetailPost";
import { PostsContext, SearchContext } from "./components/constext/context";

export interface AppState {
  name: FindPlanetResponse[];
  isLoading: boolean;
  isError: boolean;
}

export type Planet = {
  name: string;
  terrain: string;
  results?: Planet;
};

export type FindPlanetResponse = {
  value: Planet;
  results?: Planet;
  name?: string;
  terrain?: string;
};

export function App() {
  const [isError, setIsError] = useState(false);

  function setError() {
    setIsError(true);
    console.log(isError);
  }

  if (isError) {
    throw new Error("Hey bro, nice error!");
  }

  const router = createBrowserRouter([
    {
      path: "/page",
      element: <SearchBlock />,
    },
    {
      path: "/",
      element: (
        <div className="SplitPage">
          <SearchBlock /> <DetailedPost />
        </div>
      ),
    },
  ]);

  const [posts, setPosts] = useState<FindPlanetResponse[] | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>('');

  return (
    <SearchContext.Provider value={{search, setSearch}}>
    <PostsContext.Provider value={{posts, setPosts}}>
    <div className="App">
      <button onClick={setError}>Click to error</button>
      <RouterProvider router={router} />
    </div>
    </PostsContext.Provider>
    </SearchContext.Provider>
  );
}
