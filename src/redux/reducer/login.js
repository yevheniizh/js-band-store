import {
  LOG_IN,
  SIGN_OUT,
  SET_EXISTED_SESSION_USER,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOG_IN + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOG_IN + SUCCESS:
      return {
        ...state,
        entities: data,
        loading: false,
        loaded: true,
      };
    case LOG_IN + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    case SET_EXISTED_SESSION_USER:
      return {
        ...state,
        entities: data,
        loaded: true,
      };

    case SIGN_OUT:
      return {
        ...state,
        entities: {},
        loaded: false,
      };

    default:
      return state;
  }
};
