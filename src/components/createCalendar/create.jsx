import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler, createEvent } from '../../actions';
import laptop from './laptop.png';
import './create.scss';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState('');
  const [eventCreator, setEventCreator] = useState('');
  // const times = { start: 9, end: 18 }; // default start and end time of the calendar

  const onEventNameChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onEventCreatorChange = (event) => {
    setEventCreator(event.target.value);
  };

  // helper async function to create events
  // const makeEvent = async (item) => {
  //   console.log('time item:', item);
  //   return dispatch(createEvent(item));
  // };

  // // create an empty calendar
  // const timeList = {};
  // const createCalendar = async (start, end) => {
  //   const promises = [];
  //   // for loop order is kind of funky because it is easier to change it in the DOM than manipulate it with CSS grid
  //   for (let t = start; t < end + 1; t += 1) { // hours specified
  //     for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
  //       for (let d = 0; d < 7; d += 1) { // 7 days in week
  //         const timeString = `${String(d)}.${String(t)}.${String(b)}`;
  //         console.log(timeString);
  //         const timeItem = ({
  //           key: timeString, day: d, time: t, block: b, count: 0, available: [],
  //         });
  //         promises.push(makeEvent(timeItem));
  //       }
  //     }
  //   }
  //   return Promise.all(promises);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(eventTitle);
    console.log(eventCreator);
    // await createCalendar(times.start, times.end);
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
    <div className="create-page">
      <div className="logo">ScheduleMe</div>
      <div className="subtitle">WHEN2MEET FOR THE 21ST CENTURY</div>
      <div className="main-body">
        <div className="left-body">
          <div className="input1">
            <div className="input-title">Event Name: </div>
            <input type="text" className="input-box" name="EventName" onChange={onEventNameChange} />
          </div>
          <div className="input1">
            <div className="input-title">Creator: </div>
            <input type="text" className="input-box" name="Creator" onChange={onEventCreatorChange} />
          </div>
          <div className="submit-container">
            <button className="submit-btn" type="submit" onClick={onSubmit}>schedule</button>
          </div>
        </div>
        <img className="laptop-img" alt="" src={laptop} />
      </div>
    </div>
  );
}

export default Create;
