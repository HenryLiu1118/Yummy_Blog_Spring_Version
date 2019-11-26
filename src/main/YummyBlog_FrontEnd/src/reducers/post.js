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

const initialState = {
  posts: [],
  count: null,
  post: null,
  loading: true,
  error: {},
  yelps: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload.posts,
        count: payload.count,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        post: null,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_YELPS:
      return {
        ...state,
        loading: false,
        yelps: payload
      };
    case CLEAR_YELPS:
      return {
        ...state,
        loading: false,
        yelps: []
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload.likes },
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        posts: state.posts.map(p =>
          p._id === state.post._id ? { ...p, comments: payload } : p
        ),
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        posts: state.posts.map(p =>
          p._id === state.post._id
            ? {
                ...p,
                comments: p.comments.filter(comment => comment._id !== payload)
              }
            : p
        ),
        loading: false
      };
    default:
      return state;
  }
}
