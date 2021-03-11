import React, { Component } from 'react';

export class Playlists extends Component {
    static displayName = Playlists.name;

    constructor(props) {
        super(props);
        this.state = { playlists: [], loading: true };
    }

    componentDidMount() {
        this.populatePlaylistsData();
    }

    static renderPlaylistsTable(playlists) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mood</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map(playlist =>
                        <tr key={playlist.id}>
                            <td>{playlist.playlistId}</td>
                            <td>{playlist.playlistName}</td>
                            <td>{playlist.mood}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Playlists.renderPlaylistsTable(this.state.playlists);

        return (
            <div>
                <h1 id="tabelLabel" >Playlists</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populatePlaylistsData() {
        const response = await fetch('/api/playlists', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        const data = await response.json();
        this.setState({ playlists: data, loading: false });
    }
}
