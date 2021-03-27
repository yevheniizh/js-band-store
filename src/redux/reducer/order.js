import {
  ADD_TO_CART,
  MAKE_ORDER,
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

const reducer = (state = initialState, action) => {
  const { type, payload, error } = action;

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
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: true,
      };
    case MAKE_ORDER + FAILURE:
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

export default reducer;
