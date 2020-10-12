import { combineReducers } from 'redux';
import appReducer from './appReducer';
import authReducer from './authReducer';
import familyReducer from './familyReducer';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  family: familyReducer,
});
