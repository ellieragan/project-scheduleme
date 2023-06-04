import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createScheduler } from '../../actions';
import laptop from './laptop.png';
import './create.scss';

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState('');
  const [eventCreator, setEventCreator] = useState('');
  const times = { start: 9, end: 18 }; // default start and end time of the calendar

  const onEventNameChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onEventCreatorChange = (event) => {
    setEventCreator(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await createCalendar(times.start, times.end);
    // just put in dummy data for now
    const newScheduler = {
      // part of refactor: scheduler fields here only have creator and title, events are populated in the backend
      creator: eventCreator,
      title: eventTitle,
    };

    console.log('new scheduler: ', newScheduler);

    dispatch(createScheduler(newScheduler, navigate));
  };

  return (
    <div className="create-page">
      <div className="logo">ScheduleMe</div>
      <div className="subtitle">WHEN2MEET FOR THE 21ST CENTURY</div>
      <div className="main-body">
        <div className="left-body">
          <div className="input1">
            <div className="input-title">Event Name: </div>
            <input type="text" className="input-box" name="EventName" onChange={onEventNameChange} />
          </div>
          <div className="input1">
            <div className="input-title">Creator: </div>
            <input type="text" className="input-box" name="Creator" onChange={onEventCreatorChange} />
          </div>
          <div className="submit-container">
            <button className="submit-btn" type="submit" onClick={onSubmit}>schedule</button>
          </div>
        </div>
        <img className="laptop-img" alt="" src={laptop} />
      </div>
    </div>
  );
}

export default Create;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // eslint-disable-next-line no-unused-vars
// import { useParams } from 'react-router';
// import { produce } from 'immer';
// import Event from '../event/event';
// import { getAllEvents } from '../../actions';
// import Buttons from '../buttons/buttons';
// import color from '../../helper/color';
// import './main.scss';

// function Main(props) {
//   const dispatch = useDispatch();
//   const allEvents = useSelector((reduxState) => { return reduxState.event.all; });
//   const [eventInput, setEventInput] = useState([]);
//   // eslint-disable-next-line no-unused-vars
//   const [times, setTimes] = useState({ start: 9, end: 18 }); // default start and end time of the calendar
//   const [eventList, setEventList] = useState({});
//   const maxAvail = 0;

//   // update current spaces on calendar based on user input
//   const updateEvent = (id, fields) => { // modified from Chloe Fugle lab 3
//     setEventList(
//       produce((draft) => {
//         draft[id] = { ...draft[id], ...fields };
//       }),
//     );
//   };

//   // map user input events to empty calendar
//   const updateCalendar = () => {
//     Object.entries(eventInput).map(([id, value]) => {
//       const time = `${String(value.day)}.${String(value.time)}.${String(value.block)}`;
//       const details = {
//         time: value.time, day: value.day, block: value.block, count: value.count, available: value.available,
//       };
//       updateEvent(time, details);
//       return (0);
//     });
//   };

//   // load the blank calendar, then load user events and style them
//   async function loadCalendar() {
//     // await setEventList(createCalendar(times.start, times.end));
//     // console.log(eventList);
//     await updateCalendar();
//     return (maxAvail);
//   }
//   useEffect(() => {
//     dispatch(getAllEvents());
//     loadCalendar(); // initial load of the calendar
//   }, []);

//   useEffect(() => {
//     setEventInput(allEvents); // once events are gotten from useSelector, set state
//   }, [allEvents]);

//   useEffect(() => {
//     loadCalendar(); // reloads calendar after events are populated
//   }, [eventInput]);

//   return (
//     <div>
//       <p className="title">Schedule @ Now</p>
//       <div id="mainContainer">
//         <div id="leftMain">
//           <div className="calendarGrid" id="mainCalendar">

//             {Object.entries(eventList).map(([timeId, details]) => {
//               return (
//                 <Event key={timeId}
//                   id={timeId}
//                   day={details.day}
//                   time={details.time}
//                   block={details.block}
//                   count={details.count}
//                   available={details.available}
//                   color={color({ count: details.count, maxAvail, eventList })}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div id="rightMain">
//           <p className="availableGraph">available graph placeholder</p>
//           <div>
//             <Buttons />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Main;
