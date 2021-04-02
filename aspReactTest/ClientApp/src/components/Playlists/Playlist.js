import React, { useState, useEffect } from "react";
import PlaylistDataService from "../../services/PlaylistsDataService";
import "./playlist.css";

const Playlist = props => {
    const initialPlaylistState = {
        id: null,
        playlistId: "",
        playlistName: "",
        status: 0,
        mood: 0,
        updateDate: new Date(),
        published: false
    };
    const [currentPlaylist, setCurrentPlaylist] = useState(initialPlaylistState);
    const [message, setMessage] = useState("");
    const [checked, setChecked] = useState();

    const getPlaylist = id => {
        PlaylistDataService.get(id)
            .then(response => {
                setCurrentPlaylist(response.data);
                if (response.data.status !== 0) {
                    setChecked(true);
                } 
                else setChecked(false);              
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

    const handleCheckboxChange = event  => {
        console.log("🚀 ~ file: Playlist.js ~ line 62 ~ event", event)
        setChecked(!checked);
        //if(checked) setChecked(!checked);
        //else setChecked(checked);
        //const { name, value } = event.target;
        //console.log("🚀 ~ file: Playlist.js ~ line 64 ~ value", value)
        //setCurrentPlaylist({ ...currentPlaylist, [name]: value });
    };

    const updatePlaylist = () => {
        let st = 0;
        if (checked === true) {
            st = 1;
        } else st = 0 ;
        console.log("🚀 ~ file: Playlist.js ~ line 62 ~ updatePlaylist ~ checked", checked)
        // var d = new Date(); 
        // d.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

        let hrs = -(new Date().getTimezoneOffset() / 60) 
        var dt = new Date();
        dt.setHours( dt.getHours() + hrs );
        
        var data = {
            id: currentPlaylist.id,
            playlistId: currentPlaylist.playlistId,
            playlistName: currentPlaylist.playlistName,
            status: st,
            mood: currentPlaylist.mood,
            updateDate: dt
        };
        PlaylistDataService.update(currentPlaylist.id, data)
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

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input
                                type="checkbox"
                                className="form-control"
                                id="status"
                                defaultChecked={checked}
                                onChange={(event) => handleCheckboxChange(event)}
                                name="status"
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