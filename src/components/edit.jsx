import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Event from './event';
import Timeslot from './timeslot';

function Edit(props) {
  // fake gcal events
  const [eventInput, setEventInput] = useState(
    {
      '2.12.1': {
        id: '2.12.1',
        busy: true,
        day: 2,
        time: 12,
        block: 1,
      },
      '5.10.2': {
        id: '5.10.2',
        busy: true,
        day: 5,
        time: 10,
        block: 2,
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

  // create an empty calendar
  const timeList = {};
  const createCalendar = (start, end) => {
    for (let d = 0; d < 7; d += 1) { // 7 days in week
      for (let t = start; t < end + 1; t += 1) { // hours specified
        for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
          const timeString = `${String(d)}.${String(t)}.${String(b)}`;
          const timeItem = ({
            id: timeString, day: d, time: t, block: b, busy: false, availableCount: 0, available: [],
          });
          timeList[timeString] = timeItem;
        }
      }
    }
    console.log('timelist: ', timeList);
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

  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
    await updateCalendar();
  }

  const fillCalendar = () => {
    const newEmptySlots = [];
    Object.entries(eventList).forEach(([timeId, details]) => {
      const event = details;
      if (!event) {
        newEmptySlots.push({
          id: `${timeId}.empty`,
          day: details.day,
          time: details.time,
          block: details.block,
          busy: event ? event.busy : false,
          availableCount: 0,
          available: [],
        });
      }
    });
    setEmptySlots(newEmptySlots);
  };

  useEffect(() => {
    loadCalendar();
    fillCalendar();
  }, []);
  console.log('events: ', eventList);
  console.log('empty slots:', emptySlots);

  // useEffect(() => { updateCalendar(); }, []);

  return (
    <div id="editPage">
      <div className="calendarGrid" id="editCalendar">
        {Object.entries(eventList).map(([timeId, details]) => (
          <Event
            key={timeId}
            id={timeId}
            day={details.day}
            time={details.time}
            block={details.block}
            availableCount={details.availableCount}
            available={details.available}
          />
        ))}
        {emptySlots.map((emptySlot) => {
          const { id, day, time } = emptySlot;
          return (
            <div
              key={id}
              className="emptySlot"
              style={{
                gridRow: `${time + 2} / span 1`,
                gridColumn: `${day + 1} / span 1`,
              }}
            >
              <Timeslot />
            </div>
          );
        })}
      </div>
      <div id="editButton">
        <button type="button" className="button">Done</button>
      </div>
    </div>
  );
}

export default Edit;
