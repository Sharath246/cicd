import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../../redux/searchResults.redux'

export const searchStore = configureStore({
    reducer:{
        searchResults: searchReducer,
    }
})

export type RootState = ReturnType<typeof searchStore.getState>;