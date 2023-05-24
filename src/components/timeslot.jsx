import React from 'react';

function Timeslot(props) {
  const style = {
    backgroundColor: props.color,
  };

  return (
    <button
      type="button"
      className="timeslot"
      id={props.id}
      data-day={props.day}
      data-time={props.time}
      data-start={props.start}
      data-end={props.end}
      data-block={props.block}
      data-busy={props.busy}
      style={style}
      onClick={props.onClick}
    >
      {/* {props.id} */}
    </button>
  );
}

export default Timeslot;
