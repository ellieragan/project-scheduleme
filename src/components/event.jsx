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
      >
        <p className="tooltiptext">{props.available.join(', ')}</p>
        {/* {Object.entries(props.available).map(([id, name]) => {
          console.log(name);
          return (<p className="tooltiptext">{name}</p>);
        })} */}
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
