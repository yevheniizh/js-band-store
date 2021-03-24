import {
  LOG_IN,
  SIGN_OUT,
  SET_EXISTED_SESSION_USER,
  REQUEST,
  SUCCESS,
  FAILURE,
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
