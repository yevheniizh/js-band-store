import { LOGIN, REQUEST, SUCCESS, FAILURE } from './constants';

const BACKEND_URL = 'https://js-band-store-api.glitch.me';

const loginRequest = (username) => async (dispatch) => {
  dispatch({ type: LOGIN + REQUEST });
  try {
    const response = await fetch(`${BACKEND_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();

    dispatch({ type: LOGIN + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOGIN + FAILURE, error });
  }
};

export default loginRequest;
