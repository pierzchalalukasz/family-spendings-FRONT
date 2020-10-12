import axios from '../apiClient';
import {
  GET_FAMILY, GET_BUDGET, LOADING_FAMILY,
} from './types';
import { tokenConfig } from './authActions';

export const getFamily = familyId => (dispatch, getState) => {
  dispatch({ type: LOADING_FAMILY });
  axios.get(`/family/${familyId}`, tokenConfig(getState))
    .then(res => dispatch({
      type: GET_FAMILY,
      payload: res.data,
    }));
};

export const getFamilyBudget = familyId => (dispatch, getState) => {
  axios.get(`/family/${familyId}/budget`, tokenConfig(getState))
    .then(res => dispatch({
      type: GET_BUDGET,
      payload: res.data,
    }));
};
