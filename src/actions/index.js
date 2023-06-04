import axios from 'axios';

// citation: followed from Cristoforo Lab 4

const ROOT_URL = 'https://scheduleatnow-api.onrender.com/api';
const API_KEY = '?key=M_CRISTOFORO';
// keys for actiontypes
const ActionTypes = {
  GET_ALL_EVENTS: 'GET_ALL_EVENTS',
  GET_EVENT: 'GET_EVENTS',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  CREATE_USER: 'CREATE_USER',
  GET_USER_EVENTS: 'GET_USER_EVENTS',
  GET_ALL_USERS: 'GET_ALL_USERS',
  CREATE_SCHEDULER: 'CREATE_SCHEDULER',
  UPDATE_SCHEDULER: 'UPDATE_SCHEDULER',
  GET_SCHEDULER: 'GET_SCHEDULER',
  GET_SCHEDULERS: 'GET_SCHEDULERS',
  API_ERROR: 'API_ERROR',
};

const getAllEvents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/events${API_KEY}`);
      // console.log('all event response: ', response);
      dispatch({ type: ActionTypes.GET_ALL_EVENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getEvent = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/events/${id}${API_KEY}`);
      console.log('get event response: ', response);
      dispatch({ type: ActionTypes.GET_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const createEvent = async (event) => {
  // return async (dispatch) => {
  try {
    const response = await axios.post(`${ROOT_URL}/events/${API_KEY}`, event);
    return response;
    // dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
  } catch (error) {
    // dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    return 'error';
  }
  // };
};

const updateEvent = (eventInfo, id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/events/${id}${API_KEY}`, eventInfo);
      // console.log('update event response: ', response);
      dispatch({ type: ActionTypes.UPDATE_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${ROOT_URL}/events/${id}${API_KEY}`);
      // console.log('delete event response: ', response);
      dispatch({ type: ActionTypes.DELETE_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/users/${API_KEY}`, user);
      // console.log('create user response: ', response);
      dispatch({ type: ActionTypes.CREATE_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getUserEvents = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/users/${id}${API_KEY}`);
      // console.log('get user events response: ', response);
      dispatch({ type: ActionTypes.GET_USER_EVENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/users${API_KEY}`);
      // console.log('get all users response: ', response);
      dispatch({ type: ActionTypes.GET_ALL_USERS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const createScheduler = (scheduler, navigate) => { // scheduler passed only has creator and title
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/schedulers/${API_KEY}`, scheduler);
      // console.log('create scheduler response: ', response);
      console.log('data1:', response.data.id);
      dispatch({ type: ActionTypes.CREATE_SCHEDULER, payload: response.data });
      navigate(`/scheduler/${response.data.id}`);
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const updateScheduler = (schedulerInfo, schedulerId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/schedulers/${schedulerId}${API_KEY}`, schedulerInfo);
      // console.log('update scheduler response: ', response);
      dispatch({ type: ActionTypes.UPDATE_SCHEDULER, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getScheduler = (schedulerId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/schedulers/${schedulerId}${API_KEY}`);
      // console.log('get scheduler response: ', response);
      dispatch({ type: ActionTypes.GET_SCHEDULER, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getSchedulers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/schedulers${API_KEY}`);
      // console.log('get schedulers response: ', response);
      dispatch({ type: ActionTypes.GET_SCHEDULERS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

export {
  ActionTypes,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  createUser,
  getUserEvents,
  getAllUsers,
  createScheduler,
  updateScheduler,
  getScheduler,
  getSchedulers,
};
