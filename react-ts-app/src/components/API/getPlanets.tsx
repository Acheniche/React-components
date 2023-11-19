//import { Planets } from "swapi-ts";

// export async function FindPlanet(planet: string[]) {
//   const data = await Planets.findBySearch(planet);
//   return data.resources;
// }

// export async function getPage(page: number) {
//   const data = await Planets.getPage(page);
//   return data.results;
// }

export type Response = {
  results?: FindPlanetResponse[];
  resources?: FindPlanetResponse[];
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FindPlanetResponse } from "../../App";

export const planetsAPI = createApi({
  reducerPath: "planetsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (build) => ({
    fetchSearchPlanets: build.query<Response, string>({
      query: (search: string) => ({
        url: "/planets",
        params: {
          search: search,
        },
      }),
    }),
    fetchPagePlanets: build.query<Response, number>({
      query: (page: number) => ({
        url: "/planets",
        params: {
          page: page,
        },
      }),
    }),
  }),
});

export { FindPlanetResponse };
