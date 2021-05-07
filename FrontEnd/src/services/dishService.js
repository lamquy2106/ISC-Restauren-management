const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.dish).then((res) => res.data);
};

const add = (data, cateId) => {
  return api
    .post(`${api.url.baseUrl}/category/${cateId}/dish`, data)
    .then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.dish}/${id}`).then((res) => res.data);

const update = (id, data, cateId) =>
  api
    .put(`${api.url.baseUrl}/category/${cateId}/dish/${id}`, data)
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.dish}/${id}`).then((res) => res.data);
const dishService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default dishService;
