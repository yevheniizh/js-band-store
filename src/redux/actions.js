import {
  LOG_IN,
  SIGN_OUT,
  LOAD_BOOK,
  LOAD_BOOKS,
  SET_EXISTED_SESSION_USER,
  MAKE_ORDER,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ITEM,
} from './constants';

const BACKEND_URL = 'https://js-band-store-api.glitch.me';

export const setExistedSessionUser = (username) => ({
  type: SET_EXISTED_SESSION_USER,
  data: username,
});

export const logOut = () => ({
  type: SIGN_OUT,
});

export const loginResponse = (username) => async (dispatch) => {
  dispatch({ type: LOG_IN + REQUEST });
  try {
    const response = await fetch(`${BACKEND_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    dispatch({ type: LOG_IN + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOG_IN + FAILURE, error });
  }
};

export const loadBooks = (username) => async (dispatch) => {
  dispatch({ type: LOAD_BOOKS + REQUEST });

  try {
    const response = await fetch(`${BACKEND_URL}/books`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${username.token}`,
      },
    });

    if (response.status === 401) {
      const failureMessage = await response.json();
      return dispatch({ type: LOAD_BOOKS + SUCCESS, failureMessage });
    }

    const data = await response.json();
    return dispatch({ type: LOAD_BOOKS + SUCCESS, data });
  } catch (error) {
    return dispatch({ type: LOAD_BOOKS + FAILURE, error });
  }
};

export const loadBook = (username, bookId) => async (dispatch) => {
  dispatch({ type: LOAD_BOOK + REQUEST });

  try {
    const response = await fetch(`${BACKEND_URL}/books/${bookId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${username.token}`,
      },
    });

    if (response.status === 401) {
      const failureMessage = await response.json();
      return dispatch({ type: LOAD_BOOK + SUCCESS, failureMessage });
    }

    const data = await response.json();
    return dispatch({ type: LOAD_BOOK + SUCCESS, data });
  } catch (error) {
    return dispatch({ type: LOAD_BOOK + FAILURE, error });
  }
};

export const addToCart = (id, quantity) => ({
  type: ADD_TO_CART,
  payload: { id, quantity },
});

export const removeItem = (id) => ({ type: REMOVE_ITEM, payload: { id } });

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const makeOrder = (username, order) => async (dispatch) => {
  dispatch({ type: MAKE_ORDER + REQUEST });
  try {
    const setBody = { books: order };

    const response = await fetch(`${BACKEND_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${username.token}`,
      },
      body: JSON.stringify(setBody),
    });

    if (response.status === 400) {
      const failureMessage = await response.json();
      return dispatch({ type: MAKE_ORDER + SUCCESS, failureMessage });
    }

    if (response.status === 401) {
      const failureMessage = await response.json();
      return dispatch({ type: MAKE_ORDER + SUCCESS, failureMessage });
    }

    const message = await response.json();
    return dispatch({ type: MAKE_ORDER + SUCCESS, message });
  } catch (error) {
    return dispatch({ type: MAKE_ORDER + FAILURE, error });
  }
};
