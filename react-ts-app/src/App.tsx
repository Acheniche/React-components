import React, { useState } from "react";
import SearchBlock from "./components/search block/search";
import DetailedPost from "./pages/Planets/DetailedPost";

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

  return (
    <div className="App">
      <button onClick={setError}>Click to error</button>
      <div className="SplitPage">
        <SearchBlock></SearchBlock>
        <DetailedPost></DetailedPost>
      </div>
    </div>
  );
}
