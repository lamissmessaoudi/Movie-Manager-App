import './App.css';
import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { getCurrentUser } from './services/authService'
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import NotFound from './components/common/notFound';
import Costumers from './components/costumers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/register';
import Logout from './components/common/logout';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {}
  componentDidMount() {
    const user = getCurrentUser()
    console.log("user  =" + user)
    this.setState({ user })
  }
  render() {
    const { user } = this.state //for protected routes

    return (
      <main className="container">
        < ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/rentals"
            component={Rentals} />

          <Route path="/costumers"
            component={Costumers} />

          <Route path="/login"
            component={LoginForm} />

          <Route path="/logout"
            component={Logout} />
          {/* <Route path='/movies/new'
          component={MovieForm} /> */}

          {/* <Route path="/movies/:id"
            component={MovieForm} /> */}

          <ProtectedRoute
            path="/movies/:id"
            component={MovieForm} />

          <Route path="/movies"
            render={props =>
              <Movies {...props}
                user={this.state.user} />}
          />

          <Route path="/register"
            component={Register} />

          <Route path="/NotFound"
            component={NotFound} />

          <Redirect exact
            from="/"
            to="/movies" />

          <Redirect to="/NotFound" />

        </Switch>

      </main>
    );
  }

}


export default App;