import React from 'react';

function Event(props) {
  return (
    <div
      className="event"
      id={props.id}
      data-day={props.day}
      data-time={props.time}
      data-avail-count={props.availableCount}
      data-avail={props.available}
    />
  );
}

export default Event;
