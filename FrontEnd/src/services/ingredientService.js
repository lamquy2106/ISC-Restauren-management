const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.ingredient).then((res) => res.data);
};

const add = (data, ingCateId) => {
  return api
    .post(`${api.url.baseUrl}/ingredientcategory/${ingCateId}/ingredient`, data)
    .then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.ingredient}/${id}`).then((res) => res.data);

const update = (id, data, ingCateId) =>
  api
    .put(
      `${api.url.baseUrl}/ingredientcategory/${ingCateId}/ingredient/${id}`,
      data
    )
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.ingredient}/${id}`).then((res) => res.data);
const ingredientService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default ingredientService;
