import {
  GET_FAMILY, LOADING_FAMILY, GET_BUDGET,
} from '../actions/types';

const initialState = {
  family: {
    _id: undefined,
    name: '',
    budget: 0,
  },
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_FAMILY:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAMILY:
      return {
        ...state,
        family: action.payload,
        isLoading: false,
      };
    case GET_BUDGET: {
      return {
        ...state,
        family: {
          ...state.family,
          budget: action.payload.budget,
        },
      };
    }
    default:
      return state;
  }
}
