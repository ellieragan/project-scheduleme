/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ApiCalendar from 'react-google-calendar-api';

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
  const content = [];
  const eventTitles = [];
  const startTimes = [];
  const endTimes = [];
  const handleClick = () => {
    apiCalendar.handleAuthClick();
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
      // console.log(result.items[0].start.dateTime);
      // setContent(result.items.start);
      result.items.forEach((event) => {
        // Extract the title, start time, and end time for each event

        const title = event.summary;
        const startTime = event.start.dateTime;
        const endTime = event.end.dateTime;
        const fullEvent = `${title}, Starts: ${startTime}, Ends: ${endTime}`;

        // Save the extracted data to the respective variables
        eventTitles.push(title);
        startTimes.push(startTime);
        endTimes.push(endTime);
        console.log(fullEvent);
        content.push(fullEvent);
      });
    });
  };
  // const arrayDataItems = content.map((singleEvent) => <li>{singleEvent}</li>);

  return (
    <div>
      <button type="button" onClick={handleClick}>Sign in</button>
      <button type="button" onClick={handleListClick}>List all events</button>
      {/* <ul>{arrayDataItems}</ul> */}
    </div>
  );
}

export default Import;
