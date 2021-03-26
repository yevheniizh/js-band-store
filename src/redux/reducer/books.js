import { LOAD_BOOK, LOAD_BOOKS, REQUEST, SUCCESS, FAILURE } from '../constants';

import arrToMap from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, failureData, error } = action;

  switch (type) {
    case LOAD_BOOKS + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOAD_BOOKS + SUCCESS:
      if (failureData)
        return {
          ...state,
          entities: failureData,
          loading: false,
          loaded: true,
        };

      return {
        ...state,
        entities: arrToMap(data),
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

    // load one book

    case LOAD_BOOK + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOAD_BOOK + SUCCESS:
      if (failureData)
        return {
          ...state,
          entities: failureData,
          loading: false,
          loaded: true,
        };

      return {
        ...state,
        entities: { books: [data] },
        loading: false,
        loaded: true,
      };
    case LOAD_BOOK + FAILURE:
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
