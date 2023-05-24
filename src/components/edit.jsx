import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Timeslot from './timeslot';

function Edit(props) {
  // fake gcal events
  const [gcalInput, setGcalInput] = useState(
    {
      '4.10.1': {
        id: '4.10.1',
        day: 4,
        time: 10,
        start: 10,
        end: 11,
        block: 1,
        busy: true,
      },
      '3.12.0': {
        id: '3.12.0',
        day: 3,
        time: 12,
        start: 12,
        end: 15,
        block: 0,
        busy: true,
      },
    },
  );

  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});
  const [emptySlots, setEmptySlots] = useState([]);

  const updateEvent = (id, fields) => { // modified from Chloe Fugle lab 3
    console.log('id:', id);
    console.log('fields: ', fields);
    setEventList(
      produce((draft) => {
        draft[id] = { ...draft[id], ...fields };
      }),
    );
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
            // color: { backgroundColor: 'white' }, // Set initial color
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
      updateEvent(id, details);
      return (0);
    });
  };

  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
    await updateCalendar();
  }

  useEffect(() => {
    loadCalendar();
    // fillCalendar();
  }, []);

  // const fillCalendar = () => {
  //   const newEmptySlots = [];
  //   Object.entries(eventList).forEach(([timeId, details]) => {
  //     if (!details.busy) {
  //       newEmptySlots.push({
  //         id: `${timeId}.empty`,
  //         day: details.day,
  //         time: details.time,
  //         block: details.block,
  //         start: details.start,
  //         end: details.end,
  //         busy: false,
  //       });
  //     }
  //   });
  //   setEmptySlots(newEmptySlots);
  // };

  // useEffect(() => {
  //   fillCalendar();
  // }, []);

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

    // const event = eventList[id];
    // if (event && event.busy) {
    //   updateEvent(id, { busy: false });
    // } else {
    //   updateEvent(id, { busy: true });
    // }
  };

  const handleDoneClick = (id) => {
    console.log('done!');
  };

  const getTimeslotColor = (id, details, gcalIn) => {
    const isGcalEvent = Object.keys(gcalIn).includes(id);

    if (isGcalEvent) {
      return 'blue';
    } else if (details.busy) {
      return 'white';
    } else {
      return 'gray';
    }
  };

  console.log('events: ', eventList);
  console.log('empty slots:', emptySlots);

  return (
    <div id="editPage">
      <div className="editGrid editCalendar" id="editCalendar">
        {Object.entries(eventList).map(([timeId, details]) => (
          <Timeslot
            key={timeId}
            id={timeId}
            day={details.day}
            time={details.time}
            block={details.block}
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
