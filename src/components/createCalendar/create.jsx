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

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(eventTitle);
    console.log(eventCreator);
    // just put in dummy data for now
    const newScheduler = {
      creator: eventCreator,
      daysOfInterest: ['some days'],
      users: ['users'],
      calendarID: '123',
    };

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
