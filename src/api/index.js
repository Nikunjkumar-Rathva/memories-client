import axios from "axios";

const url = "http://localhost:8080/posts/";

export const fetchPosts = () => {
  return axios.get(url);
};

export const createPost = (newPost) => {
  return axios.post(url, newPost);
};
