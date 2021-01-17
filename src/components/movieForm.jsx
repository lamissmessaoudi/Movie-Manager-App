import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreServices';
//import { } from '../services/fakeMovieService';
import { saveMovie, getMovie } from '../services/movieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            dailyRentalRate: '',
            numberInStock: '',
            genreId: ''
        },
        genres: [],// get them from server in componentDidMount 
        errors: {}
    }
    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label('Title'),
        genreId: Joi.string()
            .required()
            .label('Genre'),
        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label('Daily Rental Rate'),
        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .required()
            .label('Number In Stock'),

    }
    async componentDidMount() {
        // populate genres
        const { data: genres } = await getGenres();
        this.setState({ genres });

        // populate movies
        const movieId = this.props.match.params.id;
        if (movieId === "new")
            return; // we don't want to add an existing object 
        try {
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) })

        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace("/NotFound")
        }
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = async () => {
        await saveMovie(this.state.data)
        console.log("movie data " + this.state.data)
        this.props.history.push("/movies")
        console.log("handler Submited")
    }
    render() {
        return (
            <div>
                <h1>Movie </h1>
                <form onSubmit={this.handleSubmit}>

                    {this.renderInput('title', 'title',)}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate')}

                    {this.renderButton('Save')}

                </form>

            </div>
        );
    }
}

// handleSave = () => {
//     this.props.history.push('/movies')
// }
// render() {
//     return (<di>
//         <h1> MovieForm id:{this.props.match.params.id}</h1>
//         <button
//             className="btn btn-primary"
//             onClick={this.handleSave}>save</button>
//     </di>);
// }
export default MovieForm;