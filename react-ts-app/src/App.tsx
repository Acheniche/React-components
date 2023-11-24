import React, { useState } from "react";
// import styles from "./App.module.css";
import SearchBlock from "./components/search block/search";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailedPost from "./components/Posts/DetailPost";
//import './App.css'

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

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <div className="SplitPage">
  //         <SearchBlock /> <DetailedPost />
  //       </div>
  //     ),
  //   },
  // ]);
  return (
    <div className="App">
      <button onClick={setError}>Click to error</button>
      <div className='SplitPage'>
      {/* <RouterProvider router={router} /> */}
      <SearchBlock></SearchBlock>
      <DetailedPost></DetailedPost>
      </div>
    </div>
  );
}
