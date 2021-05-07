
const { default: api } = require("./api");

const getAll = () =>{
    return api.get(api.url.area).then(res=>res.data);
}

const add = (data) => {
    return api.post(api.url.area, data).then(res=>res.data);
}

const getById = (id) => api.get(`${api.url.area}/${id}`).then(res=>res.data);

const update = (id, data) => api.put(`${api.url.area}/${id}`,data).then(res=>res.data);

const remove = (id) => api.delete(`${api.url.area}/${id}`).then(res=>res.data);
const areaService = {
    getAll, add, getById, update, remove
};

export default areaService;