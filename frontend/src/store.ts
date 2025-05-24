import { configureStore } from "@reduxjs/toolkit";
import userReducer from './redux/user.reducer.ts'
import collaboratorReducer from './redux/collaborators.reducer.ts'
import searchReducer from './redux/searchResults.redux.ts'

export const AppStore = configureStore({
    reducer:{
        user: userReducer,
        collaborator: collaboratorReducer,  
        searchResults: searchReducer,
    }
})

export type RootState = ReturnType<typeof AppStore.getState>;