import React from 'react';

function Event(props) {
  if (props.available.length !== 0) {
    return (
      <div
        className="event"
        id={props.id}
        data-day={props.day}
        data-time={props.time}
        data-block={props.block}
        data-avail-count={props.availableCount}
        data-avail={props.available}
        style={props.color}
        <p className="tooltiptext">{props.available.join(', ')}</p>
      </div>
    );
  } else {
    return (
      <div
        className="event"
        id={props.id}
        data-day={props.day}
        data-time={props.time}
        data-block={props.block}
        data-avail-count={props.availableCount}
        data-avail={props.available}
      />
    );
  }
}

export default Event;
