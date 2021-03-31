import http from "../http-common";

const getAll = () => {
  return http.get("/ParserXpaths");
};

const get = id => {
  return http.get(`/ParserXpaths/${id}`);
};

const create = data => {
  return http.post("/ParserXpaths", data);
};

const update = (id, data) => {
  return http.put(`/ParserXpaths/${id}`, data);
};

const remove = id => {
  return http.delete(`/ParserXpaths/${id}`);
};

const removeAll = () => {
  return http.delete(`/ParserXpaths`);
};

const findByName = name => {
  return http.get(`/ParserXpaths?playlistName=${name}`);
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