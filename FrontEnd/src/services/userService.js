
const { default: api } = require("./api");


const signIn = (username, password) => {
    const data = {
        username: username,
        password: password
    };
    return api.post(`${api.url.baseUrl}/auth/signin`, data).then(res=>res.data);
}

// const getById = (id) => api.get(`${api.url.desk}/${id}`).then(res=>res.data);

// const update = (id, data) => api.put(`${api.url.desk}/${id}`,data).then(res=>res.data);

// const remove = (id) => api.delete(`${api.url.desk}/${id}`).then(res=>res.data);
const userService = {
    signIn
};

export default userService;