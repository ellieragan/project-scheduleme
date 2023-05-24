import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Event from './event';
import Buttons from './buttons';

function Main(props) {
  // fake availabilities
  const [eventInput, setEventInput] = useState(
    {
      '1.9.1': {
        id: '1.9.1',
        day: 1,
        time: 9,
        block: 1,
        availableCount: 2,
        available: ['bob', 'sally'],
      },
      '4.10.3': {
        id: '4.10.3',
        day: 4,
        time: 3,
        block: 3,
        availableCount: 4,
        available: ['bob', 'sally', 'abby', 'tim'],
      },
      '5.11.2': {
        id: '5.11.2',
        day: 5,
        time: 11,
        block: 2,
        availableCount: 6,
        available: ['bob', 'sally', 'abby', 'tim', 'kat', 'ella'],
      },
    },
  );
  const startColor = {
    red: 245,
    green: 245,
    blue: 245,
  };
  const endColor = {
    red: 30,
    green: 150,
    blue: 254,
  };
  let maxAvail = 0;
  const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
  const [eventList, setEventList] = useState({});

  const updateEvent = (id, fields) => { // modified from Chloe Fugle lab 3
    setEventList(
      produce((draft) => {
        draft[id] = { ...draft[id], ...fields };
      }),
    );
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
            id: timeString, day: d, time: t, block: b, availableCount: 0, available: [],
          });
          timeList[timeString] = timeItem;
        }
      }
    }
    return timeList;
  };

  // add events to the blank calendar
  const updateCalendar = () => {
    Object.entries(eventInput).map(([id, details]) => {
      updateEvent(id, details);
      return (0);
    });
  };

  // style events based on number of people available
  const calcMaxAvailable = () => { // calculate the maximum number of people available
    const eventArray = Object.values(eventList);
    const availArray = Object.values(eventArray);
    Object.entries(availArray).map(([id, details]) => {
      if (details.availableCount > maxAvail) {
        maxAvail = details.availableCount;
      }
      return (maxAvail);
    });
  };
  calcMaxAvailable();

  const calcGradient = (numAvail) => { // calculate the color an event should be based on the number of people available
    // code modified from code by desau at https://stackoverflow.com/questions/3080421/javascript-color-gradient

    const percentFade = numAvail / maxAvail;

    let diffRed = endColor.red - startColor.red;
    let diffGreen = endColor.green - startColor.green;
    let diffBlue = endColor.blue - startColor.blue;

    diffRed = (diffRed * percentFade) + startColor.red;
    diffGreen = (diffGreen * percentFade) + startColor.green;
    diffBlue = (diffBlue * percentFade) + startColor.blue;

    const newColor = { backgroundColor: `rgb(${String(diffRed)},${String(diffGreen)},${String(diffBlue)})` };
    console.log(newColor);
    return (newColor);
  };

  // load the blank calendar, then load user events and style them
  async function loadCalendar() {
    await setEventList(createCalendar(times.start, times.end));
    await updateCalendar();

    return (maxAvail);
  }
  useEffect(() => {
    loadCalendar();
  }, []);

  return (
    <div id="mainContainer">
      <div id="leftMain">
        <div className="calendarGrid" id="mainCalendar">
          {Object.entries(eventList).map(([timeId, details]) => {
            return (
              <Event id={timeId}
                day={details.day}
                time={details.time}
                block={details.block}
                availableCount={details.availableCount}
                available={details.available}
                color={calcGradient(details.availableCount, maxAvail)}
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
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default Main;
