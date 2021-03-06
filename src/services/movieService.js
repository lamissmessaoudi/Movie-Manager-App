import http from './httpService'
//import { apiBaseUrl } from '../config.json';
import { getGenres } from './genreServices';

const apiEndpoint = "/movies"

export function getMovies() {
    return http.get(apiEndpoint)
}

export function deleteMovie(id) {
    return http.delete(apiEndpoint + "/" + id)
}

export function getMovie(id) {
    return http.get(apiEndpoint + "/" + id)
}

export function saveMovie(movie) {

    if (movie._id) {
        const body = { ...movie }
        delete body._id
        return http.put(apiEndpoint + "/" + movie._id, body)
    }

    return http.post(apiEndpoint, movie)
        ;
}