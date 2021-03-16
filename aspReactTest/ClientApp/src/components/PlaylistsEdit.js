import React, { Component, Fragment} from 'react';
import { MDBDataTable /*, MDBBtn, MDBInput */} from "mdbreact";

export class TableEditablePage extends Component {
    state = {
      columns: [
        {
          field: 'plID',
          label: 'Spotify URI'
        },
        {
          field: 'name',
          label: 'Name'
        },
        {
          field: 'mood',
          label: 'Genre'
        },
        {
          field: 'delete',
          label: 'Delete'
        }
      ],
      rows: [],
      input: ''
    }
  
    componentDidMount() {
      this.getPlaylists();
    }
  
    getPlaylists = () => {
      fetch('/api/playlists', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          let rows = [];
          json.forEach(item => rows.push({
            id: item.id,
            plID: item.playlistId,
            name: item.playlistName,
            mood: item.mood,
            // delete: <MDBBtn onClick={() => this.deletePlaylists(item.id)}>X</MDBBtn>
          }));
  
          this.setState({ rows });
        })
        .catch(err => console.error(err));
    }
  
    addPlaylist = () => {
      fetch("/api/playlists", {
        method: "POST",
        body: JSON.stringify({
          title: this.state.input
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.ok) this.getPlaylists();
        })
        .catch(err => console.error(err));
    }
  
    updateInput = (value) => this.setState({ input: value });
  
    deletePlaylists = (id) => {
      fetch(`/api/playlists/${id}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) this.getPlaylists();
        })
        .catch(err => console.error(err));
    }
  
    render() {
      return (
        <Fragment>
          <MDBDataTable
            striped
            bordered
            hover
            data={{ columns: this.state.columns, rows: this.state.rows }}
          />
  
          {/* <MDBInput value={this.state.input} getValue={this.updateInput} label="Insert playlist URI" /> */}
          {/* <MDBBtn onClick={this.addPlaylist} disabled={!this.state.input.length}>Add item</MDBBtn> */}
        </Fragment>
      );
    }
  };
  
  //export default TableEditablePage;