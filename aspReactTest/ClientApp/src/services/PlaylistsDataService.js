import http from "../http-common";

const getAll = () => {
  return http.get("/playlists");
};

const get = id => {
  return http.get(`/playlists/${id}`);
};

const create = data => {
  return http.post("/playlists", data);
};

const update = (id, data) => {
  return http.put(`/playlists/${id}`, data);
};

const remove = id => {
  return http.delete(`/playlists/${id}`);
};

const removeAll = () => {
  return http.delete(`/playlists`);
};

const findByName = name => {
  return http.get(`/playlists?playlistName=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};