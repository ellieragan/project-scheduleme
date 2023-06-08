import axios from 'axios';

// citation: followed from Cristoforo Lab 4

const ROOT_URL = 'https://scheduleatnow-api.onrender.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '?key=M_CRISTOFORO';
// keys for actiontypes
const ActionTypes = {
  GET_EVENT: 'GET_EVENTS',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  CREATE_SCHEDULER: 'CREATE_SCHEDULER',
  GET_SCHEDULER: 'GET_SCHEDULER',
  GET_SCHEDULER_EVENTS_DETAILS: 'GET_SCHEDULER_EVENTS_DETAILS',
  API_ERROR: 'API_ERROR',
};

const getEvent = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/events/${id}${API_KEY}`);
      // console.log('get event response: ', response.data);
      dispatch({ type: ActionTypes.GET_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const createEvent = async (event) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/events/${API_KEY}`, event);
      // return response;
      dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
      // return 'error';
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

const createScheduler = (scheduler, navigate) => { // scheduler passed only has creator and title
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/schedulers/${API_KEY}`, scheduler);
      console.log('create scheduler response: ', response);

      dispatch({ type: ActionTypes.CREATE_SCHEDULER, payload: response.data });
      navigate(`/scheduler/${response.data.id}`);
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error.message });
    }
  };
};

const getScheduler = (schedulerId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/schedulers/${schedulerId}${API_KEY}`);
      console.log('get scheduler response: ', response);
      dispatch({ type: ActionTypes.GET_SCHEDULER, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

// const getSchedulerEventsDetails = (schedulerId) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${ROOT_URL}/schedulers/${schedulerId}/events${API_KEY}`);
//       // console.log('get scheduler events details response: ', response);
//       dispatch({ type: ActionTypes.GET_SCHEDULER_EVENTS_DETAILS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: ActionTypes.API_ERROR, payload: error });
//     }
//   };
// };

export {
  ActionTypes,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  createScheduler,
  getScheduler,
};
