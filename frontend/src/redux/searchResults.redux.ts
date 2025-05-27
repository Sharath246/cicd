import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  peopleResults: any[];
  filteredPeople: any[];
  workspaceResults: any[];
  filteredWorkspaces: any[];
};

const initialState: stateType = {
  peopleResults: [],
  filteredPeople: [],
  workspaceResults: [],
  filteredWorkspaces: [],
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setPeopleResults: (state, action: { payload: any[] }) => {
      state.peopleResults = action.payload;
    },
    setworkspaceResults: (state, action: { payload: any[] }) => {
      state.workspaceResults = action.payload;
    },
    setFilteredPeople: (state, action: { payload: any[] }) => {
      state.filteredPeople = action.payload;
    },
    setFilteredWorkspaces: (state, action: { payload: any[] }) => {
      state.filteredWorkspaces = action.payload;
    },
  },
});

export const {
  setPeopleResults,
  setworkspaceResults,
  setFilteredPeople,
  setFilteredWorkspaces,
} = searchSlice.actions;

export default searchSlice.reducer;
