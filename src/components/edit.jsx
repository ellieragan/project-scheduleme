import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Timeslot from './timeslot';

function Edit(props) {
  // props comes in with a startblck and an endblock
  // fake gcal events
  const [gcalInput, setGcalInput] = useState(
    {
      '1.9.0': {
        id: '1.9.0',
        starttime: '2023-05-26T09:00:00Z',
        endtime: '2023-05-26T10:00:00Z',
        busy: true,
        gcal: true,
      },
      '3.12.0': {
        id: '3.12.0',
        starttime: '2023-05-28T12:00:00Z',
        endtime: '2023-05-28T14:00:00Z',
        busy: true,
        gcal: true,
      },
    },
  );

  // const parse = (gcalIn) => {
  //   for (let i = 0; i < gcalIn.length(); i += 1) {
  //     const event = gcalIn[i];
  //     const datetime = event.id.split('.');
  //     const start = new Date(event.starttime);
  //     const end = new Date(event.endtime);
  //     const milliseconds1 = start.getTime();
  //     const milliseconds2 = end.getTime();
  //     const numblocks = Math.ceil(milliseconds2 - milliseconds1) / 900000;
  //     let j = 0;
  //     while (j < numblocks):
  //       const timeString = `${String(datetime[0])}.${String(datetime[1])}.${String(b)}`;
  //       const timeItem = {
  //         id: timeString,
  //         day: d,
  //         time: t,
  //         block: b,
  //         busy: false,
  //         // color: { backgroundColor: 'white' }, // Set initial color
  //       };
  //       timeList[timeString] = timeItem;
  //     // const start = event.starttime.split();
  //     // const end = event.endtime.split();
  //   }
  // };

  // YYYY:MM:DD T HH:MM:SS Z
  // [YYYY,MM,DD, T , HH, MM, SS, Z]
  // convert to milliseconds big number
  // find difference in time
  // calculate how many 15 minute intervals this would take, rounding up
  // add those intervals from your start time

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

  const fillCalendar = (startID, endID) => {
    const updateEventList = (id) => {
      console.log('1');
      setEventList((prevEventList) => {
        const updatedEventList = {
          ...prevEventList,
          [id]: {
            ...prevEventList[id],
            busy: true,
            gcal: true,
          },
        };
        console.log('2');
        return updatedEventList;
      });
    };
    console.log('3');
    let currID = startID;
    while (currID !== endID) {
      updateEventList(currID);
      const split = currID.split('.');
      const day = split[0];
      let hour = split[1];
      const nextBlock = (parseInt(split[2], 10) + 1) % 4;
      if (nextBlock === 0) {
        hour = String(Number(hour) + 1);
      }
      currID = `${day}.${hour}.${nextBlock}`;
      console.log('currID', currID);
      console.log('endID', endID);
    }
  };

  const getDay = (gcalIn) => {
    // for each gcal event
    Object.entries(gcalIn).forEach(([id, details]) => {
      // find start day.time.block
      let gcalDay = new Date(details.starttime).getUTCDay();
      const currDay = new Date().getUTCDay();
      let day = ((gcalDay - currDay + 7) % 7) + 1;// Adjust the day relative to the current day
      let time = new Date(details.starttime).getUTCHours();
      let block = Math.ceil(new Date(details.starttime).getUTCMinutes() / 15);

      const startID = `${day}.${time}.${block}`;

      // find end day.time.block
      gcalDay = new Date(details.endtime).getUTCDay();
      day = (gcalDay - currDay + 8) % 7; // Adjust the day relative to the current day
      time = new Date(details.endtime).getUTCHours();
      block = Math.ceil(new Date(details.endtime).getUTCMinutes() / 15);

      const endID = `${day}.${time}.${block}`;

      console.log('startID', startID);
      console.log('endID', endID);

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
    await getDay(gcalInput);
  }

  useEffect(() => {
    loadCalendar();
  }, []);

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

  // gcal entry = new Date day
  // curr day = new Date().getDay

  // day: take gcal day of the week - current day of the week so that the gcal day is relative to the current day (where current day is column 0)
  // time: gcal start hour
  // block#: ceiling of (gcal start minute // 15)

  // repeat to get end id

  const handleDoneClick = (id) => {
    Object.entries(eventList).map(([timeId, details]) => {
      // console.log('timeid:', timeId);
      if (!eventList[timeId].busy) {
        console.log('available:', timeId);
      }
      return (0);
    });
  };
  // const update = async() => {
  //   await dispatchEvent(updateEvent(id, {

  //   }))
  // }

  // const handleSaveClick = () => {
  //   const update = async () => {
  //     await dispatch(updatePost({
  //       title: editedTitle,
  //       content: editedText,
  //       coverUrl: editedCover,
  //       tags: editedTags,
  //     }, postID));
  //   };
  //   update();
  //   editingMode(false);
  // };

  const getTimeslotColor = (id, details, gcalIn) => {
    // const isGcalEvent = Object.keys(gcalIn).includes(id);

    // const isGcalEvent = Object.values(gcalIn).some((event) => {
    //   // const startTime = new Date(event.starttime);
    //   // const endTime = new Date(event.endtime);
    //   // const currTime = new Date(details.starttime);
    //   // console.log('details:', details);
    //   // console.log('starttime:', event.starttime);
    //   // console.log('endtime:', event.endtime);
    //   // console.log('currTime:', details.starttime);

    //   return (
    //     Date.parse(details.starttime) >= Date.parse(event.starttime)
    //     && Date.parse(details.endtime) < Date.parse(event.endtime)
    //   );
    // });

    if (details.gcal) {
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
