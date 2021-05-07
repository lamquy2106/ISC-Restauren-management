const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.recipe).then((res) => res.data);
};

const add = (data, dishId, ingId) => {
  return api
    .post(`${api.url.baseUrl}/dish/${dishId}/ingredient/${ingId}/recipe`, data)
    .then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.recipe}/${id}`).then((res) => res.data);

const update = (id, data, dishId, ingId) =>
  api
    .put(`${api.url.baseUrl}/dish/${dishId}/ingredient/${ingId}/recipe`, data)
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.recipe}/${id}`).then((res) => res.data);
const recipeService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default recipeService;
