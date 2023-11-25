import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Planet } from "../../App";
import { HYDRATE } from "next-redux-wrapper";

export type FindPlanetResponse = {
  value: Planet;
  results?: Planet;
  name?: string;
  terrain?: string;
};

export type Response = {
  results?: FindPlanetResponse[];
  resources?: FindPlanetResponse[];
};

export const planetsAPI = createApi({
  reducerPath: "planetsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useFetchPagePlanetsQuery,
  useFetchSearchPlanetsQuery,
  util: { getRunningQueriesThunk },
} = planetsAPI;

export const { fetchSearchPlanets, fetchPagePlanets } = planetsAPI.endpoints;
