const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.ingredientCategory).then((res) => res.data);
};

const add = (data) => {
  return api.post(api.url.ingredientCategory, data).then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.ingredientCategory}/${id}`).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.ingredientCategory}/${id}`, data).then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.ingredientCategory}/${id}`).then((res) => res.data);
const ingredientCategoryService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default ingredientCategoryService;
