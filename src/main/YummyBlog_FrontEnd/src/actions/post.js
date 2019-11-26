import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  GET_YELPS,
  CLEAR_YELPS,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../actions/types";

export const getPosts = postPage => async dispatch => {
  try {
    const res = await axios.get("/api/posts?page=" + postPage);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPostOfFollows = postPage => async dispatch => {
  try {
    const res = await axios.get("/api/posts/follows?page=" + postPage);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPostByUserId = (userId, postPage) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/user/${userId}?page=` + postPage);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const clearYelp = () => async dispatch => {
  dispatch({
    type: CLEAR_YELPS
  });
};

export const SearchYelp = ({
  location,
  limit,
  price,
  categories,
  term
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ location, limit, price, categories, term });

  try {
    const res = await axios.post("/api/yelp/search", body, config);
    dispatch({
      type: GET_YELPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log(formData);
  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Post Created", "success"));
    history.push("/posts");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deletePost = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/posts/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert("Post Removed", "success"));
    history.push("/posts");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert("Post Removed Failed", "danger"));
  }
};

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch(setAlert("Comment Removed Failed", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: "err.response.statusText", status: "err.response.status" }
    });
  }
};
