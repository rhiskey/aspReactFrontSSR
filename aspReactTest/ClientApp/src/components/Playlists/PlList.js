import React, { useState, useEffect, useMemo, useRef } from "react";
import PlaylistDataService from "../../services/PlaylistsDataService";

const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },

]
  
const data = [
    {
      title: "bezkoder Tut#1",
      description: "description Tut#1",
    },
    {
      title: "bezkoder Tut#2",
      description: "description Tut#2",
    },
]


const PlaylistsList = (props) => {
  const [Playlists, setPlaylists] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const PlaylistsRef = useRef();

  PlaylistsRef.current = Playlists;

  useEffect(() => {
    retrievePlaylists();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePlaylists = () => {
    PlaylistDataService.getAll()
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePlaylists();
  };

  const removeAllPlaylists = () => {
    PlaylistDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PlaylistDataService.findByTitle(searchTitle)
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPlaylist = (rowIndex) => {
    const id = PlaylistsRef.current[rowIndex].id;

    props.history.push("/Playlists/" + id);
  };

  const deletePlaylist = (rowIndex) => {
    const id = PlaylistsRef.current[rowIndex].id;

    PlaylistDataService.remove(id)
      .then((response) => {
        props.history.push("/Playlists");

        let newPlaylists = [...PlaylistsRef.current];
        newPlaylists.splice(rowIndex, 1);

        setPlaylists(newPlaylists);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    ...
  );
};

export default PlaylistsList;