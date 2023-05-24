// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

import EventReducer from './event-reducer';

const rootReducer = combineReducers({
  event: EventReducer,
});

export default rootReducer;
