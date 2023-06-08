/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Timeslot from './timeslot';
import {
  getEvent, getScheduler, updateEvent,
} from '../../actions/index';
import './edit.scss';

function Edit(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const [scheduler, setScheduler] = useState(null);
  // const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  // const scheduler = useSelector((reduxState) => { return reduxState.scheduler.current; });
  const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
  const [eventList, setEventList] = useState({}); // list of all events
  const [eventInput, setEventInput] = useState([]);
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const Id = params.schedulerId;
  const navigate = useNavigate();
  // eslint-disable-next-line prefer-destructuring
  const userName = props.userName;

  // get every event id from the scheduler, get the corresponding event from the api, and update the event list
  const fetchEvents = async (schedulerResponse) => {
    try {
      // console.log('scheduler response:', schedulerResponse);
      const promises = schedulerResponse.events.map((id) => dispatch(getEvent(id)));
      const events = await Promise.all(promises);
      const updatedEventList = {};

      // console.log('all events: ', events);

      events.forEach((event) => { // code borrowed from main.jsx
        if (event) {
          const { day, time, block } = event;
          const timeString = `${day}.${time}.${block}`;

          updatedEventList[timeString] = {
            ...event,
            count: 0,
            available: [],
          };
        }
      });

      setEventList(updatedEventList);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    dispatch(getScheduler(Id))
      .then((schedulerResponse) => {
        setScheduler(schedulerResponse);
        fetchEvents(schedulerResponse);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [dispatch, Id]);

  // the code below was a second attempt at doing the same thing the above code does

  // useEffect(() => {
  //   if (scheduler && scheduler.events) {
  //     console.log('scheduler:', scheduler);
  //     const fetchEvents = async () => {
  //       console.log('scheduler 2', scheduler);
  //       const eventPromises = scheduler.events.map((eventId) => dispatch(getEvent(eventId)));
  //       console.log('event promises', eventPromises);
  //       const events = await Promise.all(eventPromises);
  //       const updatedEventList = {};

  //       console.log('all events: ', events);

  //       events.forEach((event) => {
  //         console.log('in for loop');
  //         if (event) {
  //           console.log('event:', event);
  //           const { day, time, block } = event;
  //           const timeString = `${day}.${time}.${block}`;

  //           updatedEventList[timeString] = {
  //             ...event,
  //             count: 0,
  //             available: [],
  //           };
  //         }
  //       });

  //       setEventList(updatedEventList);
  //     };
  //     fetchEvents();
  //   }
  //   console.log('event list 3', eventList);
  // }, [scheduler]);

  // fill in imported gcal events
  const [gcalInput, setGcalInput] = useState(props.gcalEvents);

  useEffect(() => {
    console.log('gcal input', gcalInput);
  }, [gcalInput]);

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
          // const newEvent = makeEvent(timeItem);
          timeList[timeString] = timeItem;
        }
      }
    }
    return timeList;
  };

  const emptyEventList = createCalendar(times.start, times.end);
  useEffect(() => { setEventList(emptyEventList); }, []);
  // add events to the blank calendar
  const updateCalendar = () => {
    Object.entries(eventInput).map(([id, details]) => {
      updateEvent(id, details);
      return (0);
    });
  };

  // // updates events to reflect the entirety of gcal blocks, rather than just the start
  const fillCalendar = (startID, endID) => {
    const updateEventList = (id) => {
      setEventList((prevEventList) => {
        const updatedEventList = {
          ...prevEventList,
          [id]: {
            ...prevEventList[id],
            busy: true,
            gcal: true,
          },
        };
        return updatedEventList;
      });
    };
    let currID = startID;
    while (currID !== endID) {
      updateEventList(currID);
      const split = currID.split('.');
      const day = split[0];
      let hour = split[1];
      const nextBlock = (parseInt(split[2], 10) + 1) % 4;
      if (nextBlock === 0) { // if the block has rolled over from 45 to the hour:
        hour = String(Number(hour) + 1); // increment the hour
      }
      currID = `${day}.${hour}.${nextBlock}`;
    }
  };

  // convert from gcal input format to event day.time.block format
  const getDay = (gcalIn) => {
    // for each gcal event
    Object.entries(gcalIn).forEach(([id, details]) => {
      // find start day.time.block
      console.log('name: ', details.summary);
      let gcalDay = new Date(details.starttime).getUTCDay();
      const currDay = new Date().getUTCDay();
      let day = (gcalDay - currDay);// Adjust the day relative to the current day
      let time = new Date(details.starttime).getHours();
      let block = Math.ceil(new Date(details.starttime).getUTCMinutes() / 15);

      const startID = `${day}.${time}.${block}`;

      // find end day.time.block
      gcalDay = new Date(details.endtime).getUTCDay();
      day = (gcalDay - currDay);
      time = new Date(details.endtime).getHours();
      block = Math.ceil(new Date(details.endtime).getUTCMinutes() / 15);

      const endID = `${day}.${time}.${block}`;

      fillCalendar(startID, endID);
    });
  };

  async function loadCalendar() {
    await updateCalendar();
    await getDay(gcalInput);
  }

  useEffect(() => {
    loadCalendar();
  }, []);

  // sets available events as "busy" upon click and vice versa
  const handleTimeslotClick = (id) => {
    setEventList((prevEventList) => {
      const updatedEventList = {
        ...prevEventList,
        [id]: {
          ...prevEventList[id],
          busy: !prevEventList[id].busy,
        },
      };
      return updatedEventList;
    });
  };

  // helper function for handleDoneClick; updates available count and available list
  const updateData = async (eventId, user) => {
    const event = await dispatch(getEvent(eventId));

    if (event) {
      const updatedEvent = {
        count: event.details.count + 1,
        available: [...event.details.available, user],
      };

      await dispatch(updateEvent(eventId, updatedEvent));
    }
  };

  // on "done", calls helper function to update "busy" blocks in the api and navigate back to main
  const handleDoneClick = async () => {
    for (const [timeId, details] of Object.entries(eventList)) {
      if (details.busy) {
        const eventId = details.id;
        updateData(eventId, userName);
      }
    }

    navigate(`/scheduler/${Id}`);
  };

  // determine what color a 15 minute block should be depending on if it's a gcal event, free, or designated busy by the user
  const getTimeslotColor = (id, details, gcalIn) => {
    if (details.gcal) {
      return '#CAB8FF';
    } else if (details.busy) {
      return 'gray';
    } else {
      return 'white';
    }
  };

  // console.log('event list:', eventList);
  return (
    <div id="editPage">
      <div className="grid" id="editCalendar" style={{ marginLeft: '20px' }}>
        {Object.entries(eventList).map(([timeId, details]) => (
          <Timeslot className="grid-cell"
            key={timeId}
            id={timeId}
            day={details.day}
            starttime={details.starttime}
            startblock={details.startblock}
            endtime={details.endtime}
            endblock={details.endblock}
            color={getTimeslotColor(timeId, details, eventList)}
            busy={details.busy}
            onClick={() => handleTimeslotClick(timeId)}
          />
        ))}
      </div>
      <div id="editButton">
        <button type="button" className="button" onClick={handleDoneClick}>Done</button>
      </div>
    </div>
  );
  // } else {
  //   return <div>loading</div>;
  // }
}

export default Edit;
