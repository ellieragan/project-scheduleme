// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

import EventReducer from './event-reducer';
import UserReducer from './user-reducer';
import SchedulerReducer from './scheduler-reducer';

const rootReducer = combineReducers({
  event: EventReducer,
  user: UserReducer,
  scheduler: SchedulerReducer,

});

export default rootReducer;
