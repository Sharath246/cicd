import { createSlice } from "@reduxjs/toolkit";
import { STATUS_SUCCESS } from "../utils/constants.ts";

type stateType = {
  peopleResults: any[];
  workspaceResults: any[];
};

const initialState: stateType = {
  peopleResults: [],
  workspaceResults: [],
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setPeopleResults: (state, action: { payload: any[] }) => {
      state.peopleResults.push(...action.payload);
    },
    setworkspaceResults: (state, action: { payload: any[] }) => {
      state.workspaceResults = action.payload;
    },
  },
});

export const { setPeopleResults, setworkspaceResults } = searchSlice.actions;

export default searchSlice.reducer;
