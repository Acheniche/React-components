import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export default pageSlice.reducer;
