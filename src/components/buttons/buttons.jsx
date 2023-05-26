/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import {
  MdLink, MdOutlineCloudUpload, MdOutlineCalendarToday, MdContentCopy,
} from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EmailShareButton, EmailIcon } from 'react-share';
import './buttons.scss';

function Buttons(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [icon, setIcon] = useState(MdContentCopy);

  const shareUrl = window.location.href;
  const onShareButtonClick = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false); // this set state is not working
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
      <div role="presentation" id="buttonIconContainer" onClick={onImportButtonClick}>
        <button type="button">Import</button>
        <MdOutlineCloudUpload />
      </div>
      <div role="presentation" id="buttonIconContainer" onClick={onShareButtonClick}>
        <button type="button">Share</button>
        <MdLink />
        <Modal id="shareLinkModal" isOpen={modalIsOpen}>
          <h5 className="invite-text">Invite others to schedule a meeting: </h5>
          <div id="shareLink">
            <p className="link-text">{window.location.href}</p>
            <MdContentCopy onClick={onCopyClick} />
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
          <div role="presentation" className="button-wrapper">
            <button className="close-button" type="button" onClick={onCloseModal}>Close</button>
          </div>
        </Modal>
      </div>
      <div role="presentation" id="buttonIconContainer" onClick={onScheduleButtonClick}>
        <button type="button">Schedule</button>
        <MdOutlineCalendarToday />
      </div>

    </div>
  );
}

export default Buttons;
