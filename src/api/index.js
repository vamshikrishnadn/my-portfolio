import axios from "axios";
const API = axios.create({
  baseURL: "https://portfolio-backend-dnvk.herokuapp.com/",
});


// users
export const signin = (formValues) => API.post("/user/signin", formValues);
export const signup = (formValues) => API.post("/user/signup", formValues);
export const updateUser = (id, values) => API.patch(`/user/${id}`, values);
export const fetchUser = (id) => API.get(`/user/${id}`);
