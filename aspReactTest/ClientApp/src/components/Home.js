import React, { Component } from 'react';
// import {TableEditablePage} from './PlaylistsEdit';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  // _onPressStartButton() {

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     // body: JSON.stringify({ title: 'Send start parser request' })
  //   };

  //   fetch('/api/Action/', requestOptions)
  //      .then(response => response.json())
  //      .then( data => this.setState({ loading: false }));
  // }
  
  render() {
    // const isLoading = this.state.loading;
    return (
      <div>
        <h1>Hello!</h1>
        <p>Welcome to High Volume Music</p>

        {/* <input className="btn btn-primary" type="button" value="Start Parser" onClick={this._onPressStartButton}></input> */}
        {/* <TableEditablePage/> */}
      </div>
    );
  }
}
