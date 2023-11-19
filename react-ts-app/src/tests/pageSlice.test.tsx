import pageReducer, { setPage } from "../components/store/redusers/pageSlice";

describe("pageSlice reducer", () => {
  it("should handle setPage action", () => {
    const initialState = { page: 1 };
    const newState = pageReducer(initialState, setPage(2));

    expect(newState.page).toEqual(2);
  });
});
