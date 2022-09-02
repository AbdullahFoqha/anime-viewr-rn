import { createSlice } from "@reduxjs/toolkit";
import { Anime } from "../api/models/Anime";
import { shuffleArray } from "../utility/util";

interface AnimesState {
    animes: Array<Anime>,
    selectedAnime?: Anime
}

const initialState: AnimesState = {
    animes: []
}

const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        deleteAnime: (state, action) => {
            return {
                animes: state.animes.filter(anime => anime._id !== action.payload._id)
            }
        },
        animesReceived: (state, action) => {
            state.animes = [...state.animes, ...action.payload]
            return state;
        },
        shuffleAnimes: (state) => {
            shuffleArray(state.animes)
            return state
        },
        setSelected: (state, action) => {
            state.selectedAnime = action.payload
            return state
        }
    }
})

export const {deleteAnime, animesReceived, shuffleAnimes, setSelected} = animeSlice.actions
export default animeSlice.reducer
