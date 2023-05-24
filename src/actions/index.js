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
  API_ERROR: 'API_ERROR',
};

const getAllEvents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/events${API_KEY}`);
      // console.log('all event response: ', response);
      dispatch({ type: ActionTypes.GET_ALL_EVENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

const getEvent = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/events/${id}${API_KEY}`);
      // console.log('get event response: ', response);
      dispatch({ type: ActionTypes.GET_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

const createEvent = (event) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/events/${API_KEY}`, event);
      // console.log('create event response: ', response);
      dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

const updateEvent = (eventInfo, id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/events/${id}${API_KEY}`, eventInfo);
      // console.log('update event response: ', response);
      dispatch({ type: ActionTypes.UPDATE_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
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
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
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
};
