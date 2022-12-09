import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user?.token;

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchPosts = () => {
  return API.get("/posts");
};

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`posts/${id}/likePost`);
};

export const signIn = (formData) => {
  return API.post("/user/signIn", formData);
};

export const signUp = (formData) => {
  return API.post("/user/signUp", formData);
};
