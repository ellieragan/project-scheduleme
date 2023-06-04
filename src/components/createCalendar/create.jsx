import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler } from '../../actions';
import laptop from './laptop.png';
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

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('creating event: ', eventTitle);
    console.log('with user: ', eventCreator);
    // just put in dummy data for now
    const newScheduler = {
      // part of refactor: scheduler fields here only have creator and title, events are populated in the backend
      creator: eventCreator,
      title: eventTitle,
    };
    console.log(newScheduler);

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
