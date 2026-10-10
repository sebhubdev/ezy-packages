import httpApi from "utils/http/httpApi";

export default {
  me: () => {
    return httpApi.get("/me/");
  },
  getUserById: (id) => {
    return httpApi.get(`/user/${id}`);
  },
  getAllUsers: () => {
    return httpApi.get(`/users/`);
  },
  editUser: (data) => {
    return httpApi.post(`/user/edit`, data);
  },
  createUser: (data) => httpApi.post("user/create", data),
  login: (data) => {
    return httpApi.post("/login", data);
  },
};
