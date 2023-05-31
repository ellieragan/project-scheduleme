import React from 'react';
import color from '../../helper/color';

function availableGraph(props) {
  const availableNum = [];
  const { maxAvail } = props;

  for (let i = 0; i < maxAvail; i += 1) {
    availableNum.push(i);
  }

  return (
    <div id="availableGraph">
      <p>Number of People Available</p>
      <div id="colorScale">
        {Object.entries(availableNum).map((count) => {
          return (
            <div className="availableBlock" color={color({ count, maxAvail })} />
          );
        })}
      </div>
    </div>
  );
}

export default availableGraph;
