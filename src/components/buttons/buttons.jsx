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
  // eslint-disable-next-line no-unused-vars
  const [icon, setIcon] = useState(MdContentCopy);

  const shareUrl = window.location.href;
  const onShareButtonClick = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    // check if modal is open
    console.log(modalIsOpen);
    console.log('close');
    console.log('closing moddal');
    setModalIsOpen(false);
    console.log(modalIsOpen);
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
      <NavLink id="buttonIconContainer" to="/import">
        Import
        <MdOutlineCloudUpload />
      </NavLink>
      <div role="presentation" id="buttonIconContainer" onClick={onShareButtonClick}>
        <button type="button">Share</button>
        <MdLink />
        <Modal id="shareLinkModal" isOpen={modalIsOpen}>
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
      <div role="presentation" id="buttonIconContainer" onClick={onScheduleButtonClick}>
        <button type="button">Schedule</button>
        <MdOutlineCalendarToday />
      </div>

    </div>
  );
}

export default Buttons;
