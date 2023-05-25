import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import {
  MdLink, MdOutlineCloudUpload, MdOutlineCalendarToday, MdContentCopy,
} from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EmailShareButton, EmailIcon } from 'react-share';

function Buttons(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [icon, setIcon] = useState(MdContentCopy);

  const shareUrl = window.location.href;
  const onShareButtonClick = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
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
        <Modal id="shareLinkModal" isOpen={modalIsOpen}>
          <div id="shareLink">
            <h4>{window.location.href}</h4>
            <MdContentCopy onClick={onCopyClick} />
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
          <button type="button" onClick={onCloseModal}>Close</button>
        </Modal>
      </div>
      <div id="buttonIconContainer">
        <button type="button" onClick={onScheduleButtonClick}>Schedule</button>
        <MdOutlineCalendarToday />
      </div>

    </div>
  );
}

export default Buttons;
