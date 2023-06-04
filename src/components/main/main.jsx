import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { produce } from 'immer';
import Event from '../event/event';
<<<<<<< HEAD
import { getAllEvents, getScheduler } from '../../actions';
=======
import { getAllEvents, getEvent, getScheduler } from '../../actions';
>>>>>>> 0673c07c64b5a763a22198085f591a487b0b6ba8
import Buttons from '../buttons/buttons';
import Available from '../available/availableGraph';
import color from '../../helper/color';
import './main.scss';

function Main(props) {
  const dispatch = useDispatch();
  const params = useParams();
  console.log('params', params);
  console.log('schedulerId', params.SchedulerId);
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [eventInput, setEventInput] = useState([]);
  // const [eventIds, setEventIds] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});
  const maxAvail = 0;
  const eventIds = useSelector((reduxState) => reduxState.scheduler.current.events);
  console.log('eventIds', eventIds);

  /// get the scheduler
  useEffect(() => {
    dispatch(getScheduler(params.SchedulerId))
      .catch((error) => {
        // Handle error fetching event details
        console.log('error', error);
      });
  }, [dispatch, params.schedulerId]);

  // update current spaces on calendar based on user input
  const updateEvent = (id, event) => { // modified from Chloe Fugle lab 3
    setEventList(
      produce((draft) => {
        draft[id] = { ...draft[id], ...event };
      }),
    );
  };

  // useEffect(() => {
  //   eventIds.forEach((id) => {
  //     dispatch(getEvent(id))
  //       .then((event) => {
  //         updateEvent(id, event);
  //       })
  //       .catch((error) => {
  //         // Handle error fetching event details
  //       });
  //   });
  // }, [dispatch, eventIds]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const promises = eventIds.map((id) => dispatch(getEvent(id)));
        const events = await Promise.all(promises);
        eventIds.forEach((id, index) => {
          updateEvent(id, events[index]);
        });
        setLoading(false); // Set loading state to false when all events are fetched
      } catch (error) {
        // Handle error fetching event details
      }
    };

    fetchEvents();
  }, [dispatch, eventIds]);

  // map user input events to empty calendar
  // const updateCalendar = () => {
  //   Object.entries(eventInput).map(([id, value]) => {
  //     const time = `${String(value.day)}.${String(value.time)}.${String(value.block)}`;
  //     const details = {
  //       time: value.time, day: value.day, block: value.block, count: value.count, available: value.available,
  //     };
  //     updateEvent(time, details);
  //     return (0);
  //   });
  // };

  // load the blank calendar, then load user events and style them
  // async function loadCalendar() {
  //   // await setEventList(createCalendar(times.start, times.end));
  //   // console.log(eventList);
  //   // await updateCalendar();
  //   return (maxAvail);
  // }
  // useEffect(() => {
  //   dispatch(getAllEvents());
  //   // loadCalendar(); // initial load of the calendar
  // }, []);

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

  // useEffect(() => {
  //   loadCalendar(); // reloads calendar after events are populated
  // }, [eventInput]);

  return (
    <div>
      <p className="title">Schedule @ Now</p>
      <div id="mainContainer">
        <div id="leftMain">
          <div className="calendarGrid" id="mainCalendar">
            {loading ? (
              <p>Loading events...</p> // Render a loading message or spinner while events are being fetched
            ) : (
              Object.entries(eventList).map(([id, event]) => (
                <Event
                  key={id}
                  id={id}
                  day={event.day}
                  time={event.time}
                  block={event.block}
                  count={event.count}
                  available={event.available}
                  color={color({ count: event.count, maxAvail, eventList })}
                />
              ))
            )}
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
