import { LOAD_BOOK, LOAD_BOOKS, REQUEST, SUCCESS, FAILURE } from '../constants';

import arrToMap from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  failureMessage: {},
};

export default (state = initialState, action) => {
  const { type, data, failureMessage, error } = action;

  switch (type) {
    case LOAD_BOOKS + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOAD_BOOKS + SUCCESS:
      if (failureMessage)
        return {
          ...state,
          loading: false,
          loaded: true,
          failureMessage,
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
      if (failureMessage)
        return {
          ...state,
          loading: false,
          loaded: true,
          failureMessage,
        };

      return {
        ...state,
        entities: arrToMap([data]),
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
