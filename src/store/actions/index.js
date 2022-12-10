import * as api from "../../api/index";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE_POST,
  UPDATE,
} from "../constants/actionTypes";
import cogoToast from "cogo-toast";

// Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    if (data?.success) {
      dispatch({ type: FETCH_ALL, payload: data.data });
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    if (data?.success) {
      dispatch({ type: CREATE, payload: data.data });
      cogoToast.success(data?.message);
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    if (data?.success) {
      dispatch({ type: UPDATE, payload: data.data });
      cogoToast.success(data?.message);
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);

    if (data?.success) {
      dispatch({ type: DELETE, payload: id });
      cogoToast.success(data?.message);
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    if (data?.success) {
      dispatch({ type: LIKE_POST, payload: data.data });
      cogoToast.success(data?.message);
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
  }
};
