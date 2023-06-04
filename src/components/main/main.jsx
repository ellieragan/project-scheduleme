import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { produce } from 'immer';
import Event from '../event/event';
import { getAllEvents, getScheduler } from '../../actions';
import Buttons from '../buttons/buttons';
import Available from '../available/availableGraph';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [eventInput, setEventInput] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});
  const maxAvail = 8;
  const params = useParams();
  console.log('params: ', params);

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
    Object.entries(allEvents).map(([id, value]) => {
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
    // await setEventList(createCalendar(times.start, times.end));
    // console.log('event params: ', params.list);
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
              console.log(timeId, details);
              console.log(color({ count: details.count, maxAvail }));
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
