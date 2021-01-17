import http from './httpService'
//import { apiBaseUrl } from '../config.json';

export function getGenres() {
    return http.get("/genres")
    // return genres.filter(g => g);
}
