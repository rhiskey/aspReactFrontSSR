import React, { useState, useEffect } from "react";
import PlaylistDataService from "../../services/PlaylistsDataService";
import { Link } from "react-router-dom";
// import Pagination from "@material-ui/lab/Pagination"; //TODO

const PlaylistsList = () => {
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrievePlaylists();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrievePlaylists = () => {
        PlaylistDataService.getAll()
            .then(response => {
                setPlaylists(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePlaylists();
        setCurrentPlaylist(null);
        setCurrentIndex(-1);
    };

    const setActivePlaylist = (playlist, index) => {
        setCurrentPlaylist(playlist);
        setCurrentIndex(index);
    };

    const removeAllPlaylists = () => {
        PlaylistDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        PlaylistDataService.findByName(searchName)
            .then(response => {
                setPlaylists(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
            </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Playlists List</h4>

                <ul className="list-group">
                    {playlists &&
                        playlists.map((playlist, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActivePlaylist(playlist, index)}
                                key={index}
                            >
                                {playlist.playlistName}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-2 btn btn-danger"
                    onClick={removeAllPlaylists}
                >
                    Remove All
        </button>
            </div>
            <div className="col-md-6">
                {currentPlaylist ? (
                    <div>
                        <h4>Playlist</h4>
                        <div>
                            <label>
                                <strong>URI:</strong>
                            </label>{" "}
                            {currentPlaylist.playlistId}
                        </div>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentPlaylist.playlistName}
                        </div>
                        <div>
                            <label>
                                <strong>Mood:</strong>
                            </label>{" "}
                            {currentPlaylist.mood}
                            {/* {currentPlaylist.published ? "Published" : "Pending"} */}
                        </div>

                        <Link
                            to={"/playlists/" + currentPlaylist.id}
                            className="btn btn btn-warning"
                        >
                            Edit
            </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Playlist...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistsList;