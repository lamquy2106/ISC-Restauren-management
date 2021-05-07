const { default: api } = require("./api");

const getAll = () =>{
    return api.get(`${api.url.baseUrl}/order`).then(res=>res.data);
}

const add = (data, categoryId) => {
    return api.post(`${api.url.baseUrl}/order/${categoryId}/dish`, data).then(res=>res.data);
}


const getByDeskId = (deskId) => api.get(`${api.url.baseUrl}/order/desk/${deskId}`).then(res=>res.data);

// const update = (id, data) => api.put(`${api.url.desk}/${id}`,data).then(res=>res.data);

// const remove = (id) => api.delete(`${api.url.desk}/${id}`).then(res=>res.data);
const orderService = {
    getAll, add, getByDeskId
};

export default orderService;