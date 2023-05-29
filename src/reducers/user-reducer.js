import { ActionTypes } from '../actions';

const initialState = {
  all: [], // array of users
  current: {}, // individual display of user
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_USERS:
      return { ...state, all: action.payload };
    case ActionTypes.CREATE_USER:
      return { ...state, current: action.payload };
    case ActionTypes.GET_USER_EVENTS:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
