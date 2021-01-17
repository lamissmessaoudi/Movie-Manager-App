import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const NavBar = ({ user }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Vidly </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <NavLink
                            className="nav-item nav-link"
                            to="/movies"
                        >
                            Movies
                            </NavLink>

                        <NavLink
                            className="nav-item nav-link"
                            to="/costumers"
                        >
                            Costumers
                            </NavLink>

                        <NavLink
                            className="nav-item nav-link"
                            to="/rentals"
                        >
                            Rentals
                            </NavLink>

                        {!user && (<React.Fragment>
                            <NavLink
                                className="nav-item nav-link"
                                to="/login"
                            >
                                LogIn
                            </NavLink>

                            <NavLink
                                className="nav-item nav-link"
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </React.Fragment>)}

                        {user && (<React.Fragment>
                            <NavLink
                                className="nav-item nav-link"
                                to="/profile"
                            >
                                {user.name}
                            </NavLink>

                            <NavLink
                                className="nav-item nav-link"
                                to="/logout"
                            >
                                Log Out
                            </NavLink>
                        </React.Fragment>)}
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default NavBar;