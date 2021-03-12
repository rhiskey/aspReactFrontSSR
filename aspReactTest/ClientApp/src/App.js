import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from 'react-router';
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

export default class App extends Component {
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
        </Switch>
      </Layout>
    );
  }
}
