import { ADD_TO_CART } from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload.quantity,
        },
      };

    default:
      return state;
  }
};

export default reducer;
