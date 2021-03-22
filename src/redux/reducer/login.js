import { LOGIN, REQUEST, SUCCESS, FAILURE } from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOGIN + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOGIN + SUCCESS:
      return {
        ...state,
        entities: data,
        loading: false,
        loaded: true,
      };
    case LOGIN + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    default:
      return state;
  }
};
