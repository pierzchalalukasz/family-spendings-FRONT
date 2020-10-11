import {
  INIT_APP,
} from '../actions/types';

const initialState = {
  isAppInitialized: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        isAppInitialized: true,
      };
    default:
      return state;
  }
}
