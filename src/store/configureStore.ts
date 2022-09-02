import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeReducer";

const store = configureStore({
    reducer: {
        anime: animeReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store
