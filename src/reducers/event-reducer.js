import { ActionTypes } from '../actions';

const initialState = {
  all: [], // array of events
  current: {}, // individual display of event
};

const EventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_EVENTS:
      return { ...state, all: action.payload };
    case ActionTypes.GET_EVENT:
      return { ...state, all: [...state.all, action.payload] }; // modified from https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux
    case ActionTypes.CREATE_EVENT:
      return { ...state, current: action.payload };
    case ActionTypes.UPDATE_EVENT:
      return { ...state, current: action.payload };
    case ActionTypes.DELETE_EVENT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default EventReducer;
