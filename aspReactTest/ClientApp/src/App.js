import React, { Component } from 'react';
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route} from 'react-router';
// import { Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
// import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Playlists } from './components/Playlists';
import { ConsolePhotostocks } from './components/ConsolePhotostocks';
import AddPlaylist from "./components/Playlists/AddPlaylist";
import Playlist from "./components/Playlists/Playlist";
import PlaylistsList from "./components/Playlists/PlaylistsList";

import './custom.css'

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home2 from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  static displayName = App.name;

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Layout>
        {/* <Router history={history}> */}
          <div>
            {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                bezKoder
            </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                </Link>
                </li>

                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                  </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                  </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                  </Link>
                  </li>
                )}
              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                  </a>
                  </li>
                </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                  </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                  </Link>
                    </li>
                  </div>
                )}
            </nav> */}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/counter' component={Counter} />
              {/* <Route path='/fetch-data' component={FetchData} /> */}
              <Route path='/playlistsold' component={Playlists} />
              <Route path='/photostocks' component={ConsolePhotostocks} />

              <Route exact path={"/playlists"} component={PlaylistsList} />
              {/* <Route exact path={["/", "/playlists"]} component={PlaylistsList} /> */}
              <Route exact path="/add" component={AddPlaylist} />
              <Route path="/playlists/:id" component={Playlist} />

              <Route exact path={["/home"]} component={Home2} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        {/* </Router> */}
      </Layout>
    );
  }
}


// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }
//export default connect(mapStateToProps)(App);

export default App;