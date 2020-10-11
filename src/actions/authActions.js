import axios from 'axios';
import {
  USER_LOADING, USER_LOADED, LOGIN_SUCCESS, LOGOUT_SUCCESS,
} from './types';

export const tokenConfig = getState => {
  const { token } = getState().auth;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authentication = token;
  }

  return config;
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  await axios.get('/current', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data,
    }));
};

export const signIn = data => dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data,
  });
};

export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
