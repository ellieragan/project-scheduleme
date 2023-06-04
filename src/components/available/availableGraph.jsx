import React from 'react';
import color from '../../helper/color';
import './available.scss';

function availableGraph(props) {
  const availableNum = [];
  const maxAvail = props.max;

  for (let i = 0; i < maxAvail; i += 1) {
    availableNum.push(i);
  }

  return (
    <div id="availableGraph">
      <p id="availText">Number of People Available</p>
      <div id="colorScale">
        {Object.entries(availableNum).map((id, count) => {
          return (
            <div className="availableBlock" style={color({ count, max: maxAvail })} />
          );
        })}
      </div>
    </div>
  );
}

export default availableGraph;
