import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler } from '../../actions';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState('');
  const [eventCreator, setEventCreator] = useState('');

  const onEventNameChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onEventCreatorChange = (event) => {
    setEventCreator(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(eventTitle);
    console.log(eventCreator);
    // just put in dummy data for now
    const newScheduler = {
      // part of refactor: scheduler fields here only have creator and title, events are populated in the backend
      creator: eventCreator,
      title: eventTitle,
    };

    console.log('new scheduler: ', newScheduler);

    dispatch(createScheduler(newScheduler, navigate));
  };

  return (
    <div>
      <form>
        <label htmlFor="EventName"> <br />
          Event Name:
          <input type="text" id="EventName" name="EventName" onChange={onEventNameChange} /> <br />
        </label>
        <label htmlFor="Creator"><br />
          Creator:
          <input type="text" id="Creator" name="Creator" onChange={onEventCreatorChange} /> <br />
        </label>
        <button type="submit" onClick={onSubmit}>Create Event</button>
      </form>
    </div>
  );
}

export default Create;
