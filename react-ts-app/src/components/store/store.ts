import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from "./redusers/searchSlice";
import pageReducer from "./redusers/pageSlice";
import { planetsAPI } from "../API/getPlanets";

const rootReducer = combineReducers({
  searchReducer,
  pageReducer,
  [planetsAPI.reducerPath]: planetsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        planetsAPI.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
