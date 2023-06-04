import { ActionTypes } from '../actions';

const initialState = {
  all: [], // array of all calenders
  current: {}, // individual display of calenders
};

const SchedulerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.CREATE_SCHEDULER:
      return { ...state, current: action.payload };
    case ActionTypes.JOIN_SCHEDULER:
      return { ...state, current: action.payload };
    case ActionTypes.GET_SCHEDULER:
      return { ...state, current: action.payload };
    case ActionTypes.GET_SCHEDULERS:
      return { ...state, all: action.payload };
    case ActionTypes.GET_SCHEDULER_EVENTS:
      return { ...state, current: action.payload };
    case ActionTypes.GET_SCHEDULER_EVENTS_DETAILS:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default SchedulerReducer;
