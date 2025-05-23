import { configureStore } from "@reduxjs/toolkit";
import userReducer from './redux/user.reducer.ts'

export const AppStore = configureStore({
    reducer:{
        user: userReducer
    }
})

export type RootState = ReturnType<typeof AppStore.getState>;