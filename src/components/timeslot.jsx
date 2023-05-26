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
      data-starttime={props.starttime}
      data-startblock={props.startblock}
      data-endtime={props.endtime}
      data-endblock={props.endblock}
      data-busy={props.busy}
      style={style}
      onClick={props.onClick}
    >
      {/* {props.id} */}
    </button>
  );
}

export default Timeslot;
