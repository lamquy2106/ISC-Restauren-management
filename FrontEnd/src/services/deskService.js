const { default: api } = require("./api");

const getAll = () => {
  return api.get(api.url.desk).then((res) => res.data);
};

const add = (data, areaId) => {
  return api
    .post(`${api.url.baseUrl}/area/${areaId}/desk`, data)
    .then((res) => res.data);
};

const getById = (id) =>
  api.get(`${api.url.desk}/${id}`).then((res) => res.data);

const update = (id, data, areaId) =>
  api
    .put(`${api.url.baseUrl}/area/${areaId}/desk/${id}`, data)
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.desk}/${id}`).then((res) => res.data);
const deskService = {
  getAll,
  add,
  getById,
  update,
  remove,
};

export default deskService;
