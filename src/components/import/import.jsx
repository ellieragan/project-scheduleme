/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import './import.scss';
import { NavLink } from 'react-router-dom';
import Edit from '../edit/edit';

const config = {
  clientId: '963299361919-ub5vci0rong2aecr7celqfekcu6b9pjm.apps.googleusercontent.com',
  apiKey: 'AIzaSyCHIXY-cMvDfMNyHv1k6rp2YKFNd153RHQ',
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
};

const apiCalendar = new ApiCalendar(config);

function Import() {
  const [gcalEvents, setGcalEvents] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  const addEvent = (newEvent) => {
    setGcalEvents((prevArray) => [...prevArray, newEvent]);
  };
  useEffect(() => {
    console.log(`all events: ${JSON.stringify(gcalEvents)}`);
  }, [gcalEvents]);

  const handleClick = () => {
    apiCalendar.handleAuthClick();
    // const interval = setInterval(() => {
    //   if (apiCalendar.tokenClient !== null) {
    //     clearInterval(interval);
    //     handleListClick();
    //   }
    // }, 1000); // Check every second
  };

  const handleListClick = () => {
    apiCalendar.listEvents({
      timeMin: '2023-05-24T10:00:00-07:00',
      timeMax: '2023-05-30T10:00:00-07:00',
      showDeleted: false,
      // maxResults: 10,
      orderBy: 'updated',
    }).then(({ result }) => {
      console.log(result.items);
      result.items.forEach((event) => {
        const newEvent = {
          starttime: event.start.dateTime,
          endtime: event.end.dateTime,
          busy: true,
          gcal: true,
          name: event.creator.email,
        };
        addEvent(newEvent);
      });
      setSignedIn(true);
      console.log(`signed in status: ${signedIn}`);
    });
  };

  const renderFunction = () => {
    if (!signedIn) {
      return (
        <div className="button-wrapper">
          <button className="button1" type="button" onClick={handleClick}>Sign in</button>
          <button className="button1" type="button" onClick={handleListClick}>List all events</button>
        </div>
      );
    } else {
      return (
        <Edit gcalEvents={gcalEvents} />
      );
    }
  };

  return (
    <div>{renderFunction()}</div>
  );
}

export default Import;
