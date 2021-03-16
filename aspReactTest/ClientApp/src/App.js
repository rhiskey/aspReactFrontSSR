import React, { Component } from 'react';
// import { connect } from "react-redux";
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
// import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home2 from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";



class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
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
// export default connect(mapStateToProps)(App);

export default App;