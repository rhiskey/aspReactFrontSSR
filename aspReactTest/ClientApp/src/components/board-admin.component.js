import React, { Component } from "react";

import UserService from "../services/user.service";
import PlaylistsList from "../components/Playlists/PlaylistsList";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  
  _onPressStartButton() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ title: 'Send start parser request' })
    };

    fetch('/api/Action/', requestOptions)
       .then(response => response.json());
       
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        
        <PlaylistsList/>
        
        <input className="btn btn-primary" type="button" value="Start Parser" onClick={this._onPressStartButton}></input>
      </div>
    );
  }
}