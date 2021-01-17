import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreServices';
import Pagination from './common/pagination'
import ListGroup from './common/listGroup'
import { paginate } from "../utils/paginate";
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox'
import { toast } from 'react-toastify';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' },
        selectedGenre: null,
        searchQuery: '',
    };

    async componentDidMount() {
        const { data } = await getGenres()
        const genres = [{ _id: "", name: "All Movies" }, ...data];
        const { data: movies } = await getMovies()
        this.setState({ movies, genres })
    }
    render() {
        const { length: count } = this.state.movies;
        const { user } = this.props;

        const { searchQuery, currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;

        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies
        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sortedMovies, currentPage, pageSize, selectedGenre);
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        // valueprop="_id"
                        // textprop="name" //default values
                        onItemSelect={this.handleGenreSelection}
                        selectedItem={selectedGenre} />
                </div>
                <div className="col">

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    {user && (<Link
                        className="btn btn-primary"
                        to='/movies/new'> Add Movie
                    </Link>)
                    }
                    <p> There are {filteredMovies.length} movies</p>

                    <MoviesTable
                        movies={movies}
                        onDelete={this.deleteHandler}
                        onLike={this.likeHandler}
                        onSort={this.sortHandler}
                        sortColumn={sortColumn}

                    />
                    <Pagination
                        itemCount={filteredMovies.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }

    sortHandler = (sortColumn) => {
        this.setState({ sortColumn })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
        console.log("handlePageChange");
    }

    likeHandler = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] }

        movies[index].liked = movie.liked ? !movie.liked : true;
        this.setState({ movies });
        console.log('clicked')
    }

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            sortColumn,
            selectedGenre,
            searchQuery,
            movies: allMovies } = this.state
        let filtred = allMovies
        if (searchQuery)
            filtred = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        else if (selectedGenre && selectedGenre._id)
            filtred = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtred, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtred.length, data: movies }
    }

    sortHandler = (sortColumn) => {
        this.setState({ sortColumn })
    }

    handleSearch = (query) => {
        this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 })
    }

    deleteHandler = async (movie) => {
        const originalMovies = this.state.movies
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id)
        }
        catch (exc) {
            if (exc.response && exc.response.status === 404)
                toast.error('this movie is already delete.')
            this.setState({ movies: originalMovies });
        }
    }

    handleGenreSelection = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
        // created in the state once the handler works

        console.log('handleGenreSelection');
    }
    handleSave = () => {
        this.props.history.push('/movies')
    }

}

export default Movies;

