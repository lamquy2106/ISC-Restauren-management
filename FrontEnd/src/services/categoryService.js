
const { default: api } = require("./api");

const getAll = () =>{
    return api.get(`${api.url.baseUrl}/category`).then(res=>res.data);
}

const add = (data) => {
    return api.post(`${api.url.baseUrl}/category`, data).then(res=>res.data);
}

 const getById = (id) => api.get(`${api.url.baseUrl}/category/${id}`).then(res=>res.data);

// const update = (id, data) => api.put(`${api.url.desk}/${id}`,data).then(res=>res.data);

// const remove = (id) => api.delete(`${api.url.desk}/${id}`).then(res=>res.data);
const categoryService = {
    getAll, add, getById
};

export default categoryService;