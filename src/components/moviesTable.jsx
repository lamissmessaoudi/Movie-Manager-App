import React, { Component } from 'react';
import Favorite from './common/favorite';
import Table from './common/table';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService'


class MoviesTable extends Component {

    columns = [
        {
            path: "title",
            label: "Title",
            content: movie =>
                <Link to={`/movies/${movie._id}`} >
                    {movie.title}
                </Link>
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: movie => <Favorite
                liked={movie.liked}
                onClickLike={() => this.props.onLike(movie)} />
        },
    ]
    constructor() {
        super();
        const user = getCurrentUser()
        if (user && user.isAdmin) {
            console.log("is admin yall")
            this.columns.push({
                key: "delete",
                content: movie => <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { this.props.onDelete(movie) }}>
                    delete</button>
            })
        }
    }
    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <Table columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data={movies} />
            // <table className="table">
            //     {/* <TableHeader
            //         columns={this.columns}
            //         sortColumn={sortColumn}
            //         onSort={onSort}
            //     />
            //     <TableBody data={movies} columns={this.columns} /> */}
            //     <Table columns={this.columns}
            //         sortColumn={sortColumn}
            //         onSort={onSort}
            //         data={movies} />

            // </table>
        );
    }
}

export default MoviesTable;