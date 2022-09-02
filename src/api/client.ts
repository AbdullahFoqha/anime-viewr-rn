import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://php-anime-viewer.herokuapp.com/api/'
})

export default apiClient
