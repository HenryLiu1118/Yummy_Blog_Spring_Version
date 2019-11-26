import {
  GET_MYPROFILE,
  GET_PROFILES,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_MYPROFILE,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  PROFILE_ERROR
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  myprofile: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MYPROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        myprofile: payload,
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        loading: false
      };
    case CLEAR_MYPROFILE:
      return {
        ...state,
        myprofile: null,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
