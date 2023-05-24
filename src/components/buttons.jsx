import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { MdLink, MdOutlineCloudUpload, MdOutlineCalendarToday } from 'react-icons/md';

function Buttons(props) {
  const onShareButtonClick = () => {
    console.log('share');
    // generate a link to share
  };

  const onScheduleButtonClick = () => {
    console.log('schedule');
    // go through every users availability and find times all are available
  };

  const onImportButtonClick = () => {
    console.log('import');
    // render authentication page
  };

  return (
    <div id="mainButtonContainer">
      <div id="buttonIconContainer">
        <button type="button" onClick={onImportButtonClick}>Import</button>
        <MdOutlineCloudUpload />
      </div>
      <div id="buttonIconContainer">
        <button type="button" onClick={onShareButtonClick}>Share</button>
        <MdLink />
      </div>
      <div id="buttonIconContainer">
        <button type="button" onClick={onScheduleButtonClick}>Schedule</button>
        <MdOutlineCalendarToday />
      </div>

    </div>
  );
}

export default Buttons;
