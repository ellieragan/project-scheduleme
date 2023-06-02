import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler } from '../../actions';
import './create.scss';

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
    // event.preventDefault();
    // console.log(eventTitle);
    // console.log(eventCreator);
    // // just put in dummy data for now
    // const newScheduler = {
    //   creator: eventCreator,
    //   users: ['users'],
    //   events: [],

    // };

    // dispatch(createScheduler(newScheduler, navigate));
    navigate('/import');
    // maybe dispatch whatever creates the empty calendar, and update the events array of scheduler
  };
  return (
    <div className="createContainer">
      <div className="createCalendar">
        <form id="calendarForm">
          <label htmlFor="EventName" id="EventName"> <br />
            Event Name:
            <input type="text" name="EventName" onChange={onEventNameChange} /> <br />
          </label>
          <label htmlFor="Creator" id="CreatorName"><br />
            Creator:
            <input type="text" id="Creator" name="Creator" onChange={onEventCreatorChange} /> <br />
          </label>
          <button type="submit" onClick={onSubmit}>Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
