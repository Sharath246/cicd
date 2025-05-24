import { createSlice } from "@reduxjs/toolkit";
import { STATUS_SUCCESS } from "../utils/constants.ts";

type stateType = {
  collaborators: any[];
};

const initialState: stateType = {
  collaborators: [],
};

const collaboratorsSlice = createSlice({
  name: "collaboratorsSlice",
  initialState,
  reducers: {
    addcollaborators: (state, action: { payload: any[] }) => {
      state.collaborators.push(...action.payload);
    },
    setcollaborators: (state, action: { payload: any[] }) => {
      state.collaborators = action.payload;
    },
  },
});

export const { addcollaborators, setcollaborators } = collaboratorsSlice.actions;

export default collaboratorsSlice.reducer;
