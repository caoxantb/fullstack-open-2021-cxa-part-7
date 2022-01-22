import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

const update = async (newObject) => {
  await axios.put(`${baseUrl}/${newObject.id}`, newObject);
};

const remove = async (object) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${object.id}`, config);
};

const exp = { setToken, getAll, create, createComment, update, remove };

export default exp;
