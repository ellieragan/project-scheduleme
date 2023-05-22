import React, { useState } from 'react';
import Event from './event';

function Main(props) {
  // fake availabilities
  const [events, setEvents] = useState(
    {
      9.0: {
        day: 1,
        time: 9.0,
        availableCount: 2,
        avalible: ['bob', 'sally'],
      },
      10.3: {
        day: 4,
        time: 10.3,
        availableCount: 4,
        available: ['bob', 'sally', 'abby', 'tim'],
      },
    },
  );

  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar

  const createCalendar = () => {
    const numRows = (times.end - times.start + 1) * 4; // number of 15-minute increments in the calendar
    const numCols = 7; // number of days in the week

    let minsCount = 0; // keeps track of the 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
    for (let d = 0; d < numCols; d += 1) {
      for (let t = times.start; t < numRows; t += 1) {
        if (minsCount > 3) {
          minsCount = 0;
        }
      }
    }
  };

  return (
    <div id="mainContainer">
      <div id="calendarContainer">
        <div id="calendarGrid">
          <p>Calendar</p>
        </div>
      </div>
      <div id="availableGraph">
        <p>avaliable graph</p>
      </div>
      <div id="buttonsContainer">
        <h1>buttons</h1>
      </div>
    </div>
  );
}

export default Main;
