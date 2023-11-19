// import { Dispatch, SetStateAction, createContext, useContext } from "react";
// import { FindPlanetResponse } from "../../App";

// export type PostsContext = {
//   posts: FindPlanetResponse[] | undefined;
//   setPosts: Dispatch<SetStateAction<FindPlanetResponse[] | undefined>>;
// };

// export type SearchContext = {
//   search: string | undefined;
//   setSearch: Dispatch<SetStateAction<string | undefined>>;
// };

// export const PostsContext = createContext<PostsContext | undefined>(undefined);

// export const SearchContext = createContext<SearchContext | undefined>(
//   undefined,
// );

// export function usePostsContext() {
//   const context = useContext(PostsContext);
//   if (!context) {
//     console.log(context);
//     throw new Error("Error");
//   }
//   return context;
// }

// export function useSearchContext() {
//   const context = useContext(SearchContext);
//   if (!context) {
//     console.log(context);
//     throw new Error("Error");
//   }
//   return context;
// }

import React, { useState } from "react";

const CounterWithHistory2 = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>History: {history.join(", ")}</p>
    </div>
  );
};

export default CounterWithHistory2;
