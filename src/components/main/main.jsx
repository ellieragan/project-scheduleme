import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import Event from '../event/event';
import { getAllEvents, createEvent } from '../../actions';
import Buttons from '../buttons/buttons';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [eventInput, setEventInput] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});
  const maxAvail = 0;

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
  const timeList = {};
  const createCalendar = (start, end) => {
    // for loop order is kind of funky because it is easier to change it in the DOM than manipulate it with CSS grid
    for (let t = start; t < end + 1; t += 1) { // hours specified
      for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
        for (let d = 0; d < 7; d += 1) { // 7 days in week
          const timeString = `${String(d)}.${String(t)}.${String(b)}`;
          const timeItem = ({
            key: timeString, day: d, time: t, block: b, count: 0, available: [],
          });
          const newEvent = makeEvent(timeItem);
          timeList[timeString] = newEvent;
        }
      }
    }
    return timeList;
  };

  // update current spaces on calendar based on user input
  const updateEvent = (id, fields) => { // modified from Chloe Fugle lab 3
    setEventList(
      produce((draft) => {
        draft[id] = { ...draft[id], ...fields };
      }),
    );
  };

  // map user input events to empty calendar
  const updateCalendar = () => {
    Object.entries(eventInput).map(([id, value]) => {
      const time = `${String(value.day)}.${String(value.time)}.${String(value.block)}`;
      const details = {
        time: value.time, day: value.day, block: value.block, count: value.count, available: value.available,
      };
      updateEvent(time, details);
      return (0);
    });
  };

  // load the blank calendar, then load user events and style them
  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
    console.log(eventList);
    await updateCalendar();
    return (maxAvail);
  }
  useEffect(() => {
    dispatch(getAllEvents());
    loadCalendar(); // initial load of the calendar
  }, []);

  useEffect(() => {
    setEventInput(allEvents); // once events are gotten from useSelector, set state
  }, [allEvents]);

  useEffect(() => {
    loadCalendar(); // reloads calendar after events are populated
  }, [eventInput]);

  return (
    <div>
      <p className="title">Schedule @ Now</p>
      <div id="mainContainer">
        <div id="leftMain">
          <div className="calendarGrid" id="mainCalendar">

            {Object.entries(eventList).map(([timeId, details]) => {
              return (
                <Event key={timeId}
                  id={timeId}
                  day={details.day}
                  time={details.time}
                  block={details.block}
                  count={details.count}
                  available={details.available}
                  color={color({ count: details.count, maxAvail, eventList })}
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
