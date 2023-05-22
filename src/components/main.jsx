import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Event from './event';

function Main(props) {
  // fake availabilities
  const [eventInput, setEventInput] = useState(
    {
      '1.9.1': {
        id: '1.9.1',
        day: 1,
        time: '9.1',
        availableCount: 2,
        avalible: ['bob', 'sally'],
      },
      '4.10.3': {
        id: '4.10.3',
        day: 4,
        time: '10.3',
        availableCount: 4,
        available: ['bob', 'sally', 'abby', 'tim'],
      },
    },
  );
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar

  const [eventList, setEventList] = useState({});

  const updateEvent = (id, fields) => { // modified from Chloe Fugle lab 3
    console.log(id);
    console.log(fields);
    setEventList(
      produce((draft) => {
        draft.notes[id] = { ...draft.notes[id], ...fields };
      }),
    );
  };

  // create an empty calendar
  const timeList = {};
  const createCalendar = (start, end) => {
    for (let d = 0; d < 7; d += 1) { // 7 days in week
      for (let t = start; t < end + 1; t += 1) { // hours specified
        for (let m = 0; m < 4; m += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
          const timeString = `${String(d)}.${String(t)}.${String(m)}`;
          const shortTimeString = `${String(t)}.${String(m)}`;
          const timeItem = ({
            id: timeString, day: d, time: String(shortTimeString), availableCount: 0, available: [],
          });
          timeList[timeString] = timeItem;
        }
      }
    }
    console.log(timeList);
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
    console.log(eventList);
  };
  // useEffect(() => { updateCalendar(); }, []);

  return (
    <div id="mainContainer">
      <div id="leftMain">
        <div className="calendarGrid" id="mainCalendar">
          {Object.entries(eventList).map(([timeId, details]) => {
            return (
              <Event id={timeId}
                day={details.day}
                time={details.time}
                availableCount={details.availableCount}
                available={details.available}
              />
            );
          })}
        </div>
      </div>
      <div id="rightMain">
        <div id="availableGraph">
          <p>avaliable graph</p>
        </div>
        <div id="buttonsContainer">
          <h1>buttons</h1>
        </div>
      </div>
    </div>
  );
}

export default Main;
