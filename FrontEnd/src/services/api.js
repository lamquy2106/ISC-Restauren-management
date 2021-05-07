import axios from "axios";
import store from "./../store/index";

const url = {
  baseUrl: "http://localhost:8080/api",
  area: "/area",
  desk: "/desk",
  category: "/category",
  ingredientCategory: "/ingredientcategory",
  ingredient: "/ingredient",
  dish: "/dish",
  login: "/signin",
  recipe: "/recipe",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  return request;
});

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default api;
