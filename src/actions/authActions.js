import axios from 'axios';
import { USER_LOADING, USER_LOADED, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios.get('/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
}

export const signIn = data => dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  if(token) {
    config.headers['Authentication'] = token;
  }

  return config;
}