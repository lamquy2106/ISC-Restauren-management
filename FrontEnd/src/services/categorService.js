const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.category).then((res) => res.data);
};

const add = (data) => {
  return api.post(api.url.category, data).then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.category}/${id}`).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.category}/${id}`, data).then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.category}/${id}`).then((res) => res.data);
const categoryService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default categoryService;
