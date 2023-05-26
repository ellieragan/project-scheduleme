/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { useDispatch } from 'react-redux';
import Timeslot from './timeslot';
import { getEvent, updateEvent } from '../../actions/index';

function Edit(props) {
  const dispatch = useDispatch();

  // fake gcal events
  const [gcalInput, setGcalInput] = useState(
    {
      '1.9.0': {
        id: '1.9.0',
        starttime: '2023-05-26T09:00:00Z',
        endtime: '2023-05-26T10:00:00Z',
        busy: true,
        gcal: true,
        name: 'ellie',
      },
      '3.12.0': {
        id: '3.12.0',
        starttime: '2023-05-28T12:00:00Z',
        endtime: '2023-05-28T14:00:00Z',
        busy: true,
        gcal: true,
        name: 'ellie',
      },
    },
  );

  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({}); // list of all events

  const produceEvent = (id, fields) => { // modified from Chloe Fugle lab 3
    setEventList(
      produce((draft) => {
        draft[id] = { ...draft[id], ...fields };
      }),
    );
  };

  // updates events to reflect the entirety of gcal blocks, rather than just the start
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
      let gcalDay = new Date(details.starttime).getUTCDay();
      const currDay = new Date().getUTCDay();
      let day = ((gcalDay - currDay + 7) % 7) + 1;// Adjust the day relative to the current day so today is always day 0
      let time = new Date(details.starttime).getUTCHours();
      let block = Math.ceil(new Date(details.starttime).getUTCMinutes() / 15);

      const startID = `${day}.${time}.${block}`;

      // find end day.time.block
      gcalDay = new Date(details.endtime).getUTCDay();
      day = ((gcalDay - currDay + 7) % 7) + 1;
      time = new Date(details.endtime).getUTCHours();
      block = Math.ceil(new Date(details.endtime).getUTCMinutes() / 15);

      const endID = `${day}.${time}.${block}`;

      fillCalendar(startID, endID);
    });
  };

  const timeList = {};
  const createCalendar = (start, end) => {
    for (let t = start; t < end + 1; t += 1) { // hours specified
      for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
        for (let d = 0; d < 7; d += 1) { // 7 days in week
          const timeString = `${String(d)}.${String(t)}.${String(b)}`;
          const timeItem = {
            id: timeString,
            day: d,
            time: t,
            block: b,
            busy: false,
            gcal: false,
          };
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
    Object.entries(gcalInput).map(([id, details]) => {
      produceEvent(id, details);
      return (0);
    });
  };

  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
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

  // helper function to call api to update available events
  const updateData = async (details) => {
    // console.log('details;', details);
    // const free = await dispatch(getEvent(details.id));

    // if (free) {
    //   await dispatch(updateEvent(details.id, {
    //     count: free.details.count + 1,
    //     available: [...free.details.available, 'ellie'],
    //   }));
    // }
  };

  // calls helper function upon pressing "done"
  const handleDoneClick = () => {
    Object.entries(eventList).forEach(([timeId, details]) => {
      if (!details.busy) {
        updateData(details);
      }
    });
  };

  const getTimeslotColor = (id, details, gcalIn) => {
    if (details.gcal) {
      return 'blue';
    } else if (details.busy) {
      return 'white';
    } else {
      return 'gray';
    }
  };

  return (
    <div id="editPage">
      <div className="editGrid editCalendar" id="editCalendar">
        {Object.entries(eventList).map(([timeId, details]) => (
          <Timeslot
            key={timeId}
            id={timeId}
            day={details.day}
            starttime={details.starttime}
            startblock={details.startblock}
            endtime={details.endtime}
            endblock={details.endblock}
            color={getTimeslotColor(timeId, details, gcalInput)}
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
}

export default Edit;
