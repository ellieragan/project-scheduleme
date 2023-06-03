import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler, createEvent } from '../../actions';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState('');
  const [eventCreator, setEventCreator] = useState('');
  const times = { start: 9, end: 18 }; // default start and end time of the calendar

  const onEventNameChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onEventCreatorChange = (event) => {
    setEventCreator(event.target.value);
  };

  // helper async function to create events
  const makeEvent = async (item) => {
    console.log('time item:', item);
    return dispatch(createEvent(item));
  };

  // create an empty calendar
  const timeList = {};
  const createCalendar = async (start, end) => {
    const promises = [];
    // for loop order is kind of funky because it is easier to change it in the DOM than manipulate it with CSS grid
    for (let t = start; t < end + 1; t += 1) { // hours specified
      for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
        for (let d = 0; d < 7; d += 1) { // 7 days in week
          const timeString = `${String(d)}.${String(t)}.${String(b)}`;
          console.log(timeString);
          const timeItem = ({
            key: timeString, day: d, time: t, block: b, count: 0, available: [],
          });
          promises.push(makeEvent(timeItem));
        }
      }
    }
    return Promise.all(promises);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await createCalendar(times.start, times.end);
    // just put in dummy data for now
    const newScheduler = {
      creator: eventCreator,
      users: ['users'],
      events: [],
    };

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
