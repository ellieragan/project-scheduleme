/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { produce } from 'immer';
import Event from '../event/event';
import { getAllEvents, getScheduler, updateEvent } from '../../actions';
import Buttons from '../buttons/buttons';
import Available from '../available/availableGraph';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const allEvents = useSelector((reduxState) => { return reduxState.scheduler.current.events; });
  let maxAvail = 0;

  // map user input events to empty calendar
  const updateCalendar = () => {
    Object.entries(allEvents).map(([id, value]) => {
      // const time = `${String(value.day)}.${String(value.time)}.${String(value.block)}`;
      const details = {
        time: value.time, day: value.day, block: value.block, count: value.count, available: value.available,
      };
      updateEvent(details, id);
      return (0);
    });
  };

  // load the blank calendar, then load user events and style them
  async function populateCalendar() {
    await updateCalendar();
    return (maxAvail);
  }

  // style events based on number of people available
  const calcMaxAvailable = () => { // calculate the maximum number of people available
    const eventArray = Object.values(allEvents); // not sure if this is going to work because the structure has changed
    const availArray = Object.values(eventArray); // but can fix later if it breaks @maria
    Object.entries(availArray).map(([id, details]) => {
      if (details.availableCount > maxAvail) {
        maxAvail = details.availableCount;
      }
      return (0);
    });
  };

  // load the main page
  useEffect(() => {
    dispatch(getScheduler);
    populateCalendar(); // initial load of the calendar
    calcMaxAvailable(); // calculate the maximum number of people available for color gradient
  }, []);

  return (
    <div>
      <p className="title">Schedule @ Now</p>
      <div id="mainContainer">
        <div id="leftMain">
          <div className="calendarGrid" id="mainCalendar">

            {Object.entries(allEvents).map(([timeId, details]) => {
              return (
                <Event key={timeId}
                  id={timeId}
                  day={details.day}
                  time={details.time}
                  block={details.block}
                  count={details.count}
                  available={details.available}
                  color={color({ count: details.count, maxAvail })}
                />
              );
            })}
          </div>
        </div>
        <div id="rightMain">
          <Available />
          <div>
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
