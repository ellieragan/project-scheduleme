import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { produce } from 'immer';
import Event from '../event/event';
import { getScheduler, updateEvent } from '../../actions';
import Buttons from '../buttons/buttons';
import Available from '../available/availableGraph';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const params = useParams();
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [eventInput, setEventInput] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});
  const maxAvail = 8;

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
          // timeList[timeString] = timeItem;
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
=======
  const allEvents = useSelector((reduxState) => { return reduxState.scheduler.current.events; });
  let maxAvail = 0;
>>>>>>> aba34674adbb1c24211f715ed3bbd403a4d8ca33

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
<<<<<<< HEAD
  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
    console.log('event params: ', params.list);
    await setEventInput(params.list);
=======
  async function populateCalendar() {
>>>>>>> aba34674adbb1c24211f715ed3bbd403a4d8ca33
    await updateCalendar();
    return (maxAvail);
  }

<<<<<<< HEAD
  console.log('event list:', eventList);

  // style events based on number of people available
  // const calcMaxAvailable = () => { // calculate the maximum number of people available
  //   const eventArray = Object.values(eventList);
  //   const availArray = Object.values(eventArray);
  //   Object.entries(availArray).map(([id, details]) => {
  //     if (details.availableCount > maxAvail) {
  //       maxAvail = details.availableCount;
  //     }
  //     return (maxAvail);
  //   });
  // };

  useEffect(() => {
    // dispatch(getAllEvents());
    loadCalendar(); // initial load of the calendar
    console.log('home');
    // calcMaxAvailable();
  }, []);

  // useEffect(() => {
  //   setEventInput(allEvents); // once events are gotten from useSelector, set state
  // }, [allEvents]);

  useEffect(() => {
    loadCalendar(); // reloads calendar after events are populated
  }, [eventInput]);
  console.log('eventinput', eventInput);
=======
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

>>>>>>> aba34674adbb1c24211f715ed3bbd403a4d8ca33
  return (
    <div>
      <p className="title">Schedule @ Now</p>
      <div id="mainContainer">
        <div id="leftMain">
          <div className="calendarGrid" id="mainCalendar">
<<<<<<< HEAD
            {Object.entries(eventList).map(([timeId, details]) => {
              console.log(timeId, details);
              console.log(color({ count: details.count, maxAvail }));
=======

            {Object.entries(allEvents).map(([timeId, details]) => {
>>>>>>> aba34674adbb1c24211f715ed3bbd403a4d8ca33
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
