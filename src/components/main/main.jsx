import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Event from '../event/event';
import { getAllEvents, updateEvent } from '../../actions';
import Buttons from '../buttons/buttons';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  console.log(allEvents);
  const maxAvail = 0;

  // map user input events to empty calendar
  const updateCalendar = () => {
    Object.entries(allEvents).map(([id, value]) => {
      // const time = `${String(value.day)}.${String(value.time)}.${String(value.block)}`;
      const details = {
        time: value.time, day: value.day, block: value.block, count: value.count, available: value.available,
      };
      // console.log(details);
      updateEvent(details, id);
      return (0);
    });
  };

  // load the blank calendar, then load user events and style them
  async function populateCalendar() {
    await updateCalendar();
    return (maxAvail);
  }

  useEffect(() => {
    dispatch(getAllEvents());
    populateCalendar(); // initial load of the calendar
    console.log('populateCalendar');
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
                  color={color({ count: details.count, maxAvail, eventList: allEvents })}
                />
              );
            })}
          </div>
        </div>
        <div id="rightMain">
          <p className="availableGraph">available graph placeholder</p>
          <div>
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
