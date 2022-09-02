import { Anime } from "./models/Anime";
import apiClient from "./client";
import { AxiosResponse } from "axios";

const endpoint: string = '/animes'

const getAnimes = async (): Promise<AxiosResponse<Array<Anime>>> => apiClient.get(endpoint)
const getAnimeDetails = async (animeId: string): Promise<AxiosResponse<Anime>> => apiClient.get(`${endpoint}/${animeId}`)

export default {
    getAnimes,
    getAnimeDetails
}
