import { combineReducers } from 'redux';
import logInOutReducer from './logInOutReducer';

const rootReducer = combineReducers({
  //각reducer 명의 js를 만들어서 import하고 추가하기.
  logInOutReducer,
});

export default rootReducer;
