import { LOAD_BOOKS, REQUEST, SUCCESS, FAILURE } from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOAD_BOOKS + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOAD_BOOKS + SUCCESS:
      return {
        ...state,
        entities: data,
        loading: false,
        loaded: true,
      };
    case LOAD_BOOKS + FAILURE:
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
