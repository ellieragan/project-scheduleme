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
  const handleClick = () => {
    apiCalendar.handleAuthClick();
  };
  const handleListClick = () => {
    apiCalendar.listUpcomingEvents(10).then(({ result }) => {
      console.log(result.items);
    });
  };
  return (
    <div>
      <button type="button" onClick={handleClick}>Sign in</button>
      <button type="button" onClick={handleListClick}>List all events</button>
    </div>
  );
}

export default Import;
