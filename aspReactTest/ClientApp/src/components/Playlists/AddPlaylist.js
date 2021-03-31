import React, { useState } from "react";
import PlaylistDataService from "../../services/PlaylistsDataService";

const AddPlaylist = () => {
    const initialPlaylistState = {
        id: null,
        playlistId: "",
        playlistName: "",
        mood: 0,
        status: 1,
        updateDate: new Date(),
        published: false
    };
    const [playlist, setPlaylist] = useState(initialPlaylistState);
    const [submitted, setSubmitted] = useState(false);
    const [checked, setChecked] = React.useState(true);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const savePlaylist = () => {
        let st = 0;
        if (checked===true){
            st=1;
        }

        let hrs = -(new Date().getTimezoneOffset() / 60) 
        var dt = new Date();
        dt.setHours( dt.getHours() + hrs );

        var data = {
            playlistId: playlist.playlistId,
            playlistName: playlist.playlistName,
            status: st,
            updateDate: dt
        };

        PlaylistDataService.create(data)
            .then(response => {
                setPlaylist({
                    // id: response.data.id,
                    playlistId: response.data.playlistId,
                    playlistName: response.data.playlistName,
                    status: response.status,
                    updateDate: response.updateDate
                    // mood: response.data.mood
                });
                setSubmitted(true);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPlaylist = () => {
        setPlaylist(initialPlaylistState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPlaylist}>
                        Add
            </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="uri">URI</label>
                        <input
                            type="text"
                            className="form-control"
                            id="uri"
                            required
                            value={playlist.playlistId}
                            onChange={handleInputChange}
                            name="playlistId" //IMPORTANT! Match API
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={playlist.playlistName}
                            onChange={handleInputChange}
                            name="playlistName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                            type="checkbox"
                            className="form-control"
                            id="status"
                            defaultChecked={checked}
                            onChange={() => setChecked(!checked)}
                            // value={playlist.status}
                            // onChange={handleInputChange}
                            name="status"
                        />
                    </div>
                    <button onClick={savePlaylist} className="btn btn-success">
                        Submit
            </button>
                </div>
            )}
        </div>
    );
};

export default AddPlaylist;