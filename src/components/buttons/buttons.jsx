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
import { NavLink } from 'react-router-dom';

function Buttons(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  return (
    <div id="mainButtonContainer">
      <div role="presentation" id="buttonIconMainContainer" onClick={onScheduleButtonClick} />
      <NavLink id="buttonIconContainerImport" to="/import">
        <div id="textContainer">
          <span id="textDiv">Import</span>
        </div>
        <div id="circularOutline">
          <MdOutlineCloudUpload className="icon" id="cloudIcon" />
        </div>
      </NavLink>
      <div role="presentation" id="mainContainerWithModal">
        <div role="presentation" id="buttonIconContainerShare" onClick={onShareButtonClick}>
          <div id="textContainer">
            <span id="textDiv">Share</span>
          </div>
          {/* <button type="button" onClick={onShareButtonClick}>Share</button> */}
          <div id="circularOutline">
            <MdLink className="icon" id="shareIcon" />
          </div>
        </div>
        <Modal id="shareLinkModal" isOpen={modalIsOpen} onRequestClose={onCloseModal}>
          <h5 className="invite-text">Invite others to schedule a meeting: </h5>
          <div id="shareLink">
            <p className="link-text">{window.location.href}</p>
            <MdContentCopy onClick={onCopyClick} />
          </div>
          <div id="emailShareButton">
            <EmailShareButton url={shareUrl}>
              Send link as email <EmailIcon size={28} round />
            </EmailShareButton>
          </div>
          <div role="presentation" className="button-wrapper">
            <button className="close-button" type="button" onClick={onCloseModal}>Close</button>
          </div>
        </Modal>
      </div>
      <div role="presentation" id="buttonIconContainerSchedule" onClick={onScheduleButtonClick}>
        <div id="textContainer">
          <span id="textDiv">Schedule</span>
        </div>
        <div id="circularOutline">
          <MdOutlineCalendarToday className="icon" id="scheduleIcon" />
        </div>
      </div>

    </div>
  );
}

export default Buttons;
