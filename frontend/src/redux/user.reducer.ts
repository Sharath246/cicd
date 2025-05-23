import {createSlice} from "@reduxjs/toolkit"
import { STATUS_SUCCESS } from "../utils/constants.ts";

const initialState = {
    user: undefined,
    userFetchStatus: "",
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        setUserData: (state,action) =>{
            state.user = action.payload;
            state.userFetchStatus = STATUS_SUCCESS;
        }
    }
})

export const {
    setUserData
} = userSlice.actions;

export default userSlice.reducer;