import authReducer from './authReducer';
import guideStat from './guideStat';
import gpsState from './gpsReducer';
import userInfo from './userInfoReducer';
import workPlace from './workPlace';
import areaDestReducer from './areaDestReducer';
import myRequest from './requestTrack';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  authReducer,
  guideStat,
  userInfo,
  workPlace,
  areaDestReducer,
  myRequest,
  // gpsState,
});

export default rootReducer;
