import React, { useState, useEffect } from "react";
import PlaylistDataService from "../../services/PlaylistsDataService";
import "./playlist.css";

const Playlist = props => {
    const initialPlaylistState = {
        id: null,
        playlistId: "",
        playlistName: "",
        mood: 0,
        published: false
    };
    const [currentPlaylist, setCurrentPlaylist] = useState(initialPlaylistState);
    const [message, setMessage] = useState("");

    const getPlaylist = id => {
        PlaylistDataService.get(id)
            .then(response => {
                setCurrentPlaylist(response.data);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getPlaylist(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPlaylist({ ...currentPlaylist, [name]: value });
    };

    // const updatePublished = status => {
    //     var data = {
    //         id: currentPlaylist.id,
    //         playlistId: currentPlaylist.playlistId,
    //         playlistName: currentPlaylist.playlistName,
    //         mood: currentPlaylist.mood,
    //         // published: status
    //     };

    //     PlaylistDataService.update(currentPlaylist.id, data)
    //         .then(response => {
    //             setCurrentPlaylist({ ...currentPlaylist, published: status });
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const updatePlaylist = () => {
        PlaylistDataService.update(currentPlaylist.id, currentPlaylist)
            .then(response => {
                //console.log(response.data);
                setMessage("The playlist was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePlaylist = () => {
        PlaylistDataService.remove(currentPlaylist.id)
            .then(response => {
                //console.log(response.data);
                props.history.push("/playlists");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPlaylist ? (
                <div className="edit-form">
                    <h4>Playlist</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="plid">URI</label>
                            <input
                                type="text"
                                className="form-control"
                                id="plid"
                                name="playlistId" //IMPORTANT! Match API
                                value={currentPlaylist.playlistId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="playlistName"
                                value={currentPlaylist.playlistName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mood">Mood</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mood"
                                name="mood"
                                value={currentPlaylist.mood}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentPlaylist.published ? "Published" : "Pending"}
                        </div> */}
                    </form>
                    {/* 
                    {currentPlaylist.published ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )} */}

                    <div className="grid_container">
                        <div className="item-delete">
                            <button className="btn btn-danger" onClick={deletePlaylist}>
                                Delete
                        </button>
                        </div>
                        <div className="item-update">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={updatePlaylist}
                            >
                                Update
                        </button>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Playlist...</p>
                </div>
            )}
        </div>
    );
};

export default Playlist;