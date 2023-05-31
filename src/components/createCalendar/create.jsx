import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler, createEvent } from '../../actions';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState('');
  const [eventCreator, setEventCreator] = useState('');
  const [blankEvents, setBlankEvents] = useState([]);
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar

  const onEventNameChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onEventCreatorChange = (event) => {
    setEventCreator(event.target.value);
  };

  // helper async function to create events
  const makeEvent = async (item) => {
    // console.log('time item:', item);
    const newevent = await dispatch(createEvent(item));
    if (newevent) {
      return newevent;
    }
    return 0;
  };

  // create an empty calendar

  const createCalendar = async (start, end) => {
    const timeList = [];
    // for loop order is kind of funky because it is easier to change it in the DOM than manipulate it with CSS grid
    for (let t = start; t < end + 1; t += 1) { // hours specified
      for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
        for (let d = 0; d < 7; d += 1) { // 7 days in week
          const timeString = `${String(d)}.${String(t)}.${String(b)}`;
          const timeItem = ({
            key: timeString, day: d, time: t, block: b, count: 0, available: [],
          });
          makeEvent(timeItem).then((newEvent) => {
            timeList.push(newEvent);
          });
        }
      }
    }
    return timeList;
  };

  useEffect(() => {
    setBlankEvents(createCalendar(times.start, times.end));
  }, []);

  useEffect(() => {
    console.log('blankevents: ', blankEvents);
  }, [blankEvents]);

  const onSubmit = async (event) => {
    console.log('blankevents', blankEvents);
    event.preventDefault();
    console.log(eventTitle);
    console.log(eventCreator);
    // just put in dummy data for now
    const newScheduler = {
      creator: eventCreator,
      users: ['users'],
      events: blankEvents,
    };

    console.log('new scheduler: ', newScheduler);

    dispatch(createScheduler(newScheduler, navigate));
    // maybe dispatch whatever creates the empty calendar, and update the events array of scheduler
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
