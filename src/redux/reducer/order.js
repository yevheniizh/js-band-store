import {
  ADD_TO_CART,
  MAKE_ORDER,
  REQUEST,
  SUCCESS,
  FAILURE,
  SIGN_OUT,
  CLEAR_CART,
  REMOVE_ITEM,
} from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  message: {},
  failureMessage: {},
};

const reducer = (state = initialState, action) => {
  const { type, message, failureMessage, payload, error } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload.quantity,
        },
      };

    case MAKE_ORDER + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case MAKE_ORDER + SUCCESS:
      if (failureMessage)
        return {
          ...state,
          loading: false,
          loaded: true,
          failureMessage,
        };

      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    case MAKE_ORDER + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: 0,
        },
      };
    case CLEAR_CART:
      return {
        ...state,
        entities: {},
        message: {},
        loaded: false,
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

export default reducer;
