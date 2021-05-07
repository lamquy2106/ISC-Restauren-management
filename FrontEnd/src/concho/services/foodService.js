
const { default: api } = require("./api");

const getAll = () =>{
    return api.get(`${api.url.baseUrl}/dish`).then(res=>res.data);
}

const add = (data, categoryId) => {
    return api.post(`${api.url.baseUrl}/category/${categoryId}/dish`, data).then(res=>res.data);
}

// const getById = (id) => api.get(`${api.url.desk}/${id}`).then(res=>res.data);

// const update = (id, data) => api.put(`${api.url.desk}/${id}`,data).then(res=>res.data);

// const remove = (id) => api.delete(`${api.url.desk}/${id}`).then(res=>res.data);
const foodService = {
    getAll, add
};

export default foodService;