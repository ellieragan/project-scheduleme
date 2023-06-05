function color(props) {
<<<<<<< HEAD
  const { eventList } = props;
  const { availableCount } = props;
  const { maxAvail } = props;
=======
  const { count } = props;
  const maxAvail = props.max;
>>>>>>> 1e9bc4c206eb71340d8afe1d76f628c637ea11dd

  const startColor = {
    red: 245,
    green: 245,
    blue: 245,
  };
  const endColor = {
    red: 30,
    green: 150,
    blue: 254,
  };

  // style events based on number of people available
  const calcMaxAvailable = () => { // calculate the maximum number of people available
    const eventArray = Object.values(eventList);
    const availArray = Object.values(eventArray);
    Object.entries(availArray).map(([id, details]) => {
      if (details.availableCount > maxAvail) {
        // eslint-disable-next-line no-const-assign
        maxAvail = details.availableCount;
      }
      return (maxAvail);
    });
  };
  calcMaxAvailable();

  const calcGradient = (numAvail) => { // calculate the color an event should be based on the number of people available
    // code modified from code by desau at https://stackoverflow.com/questions/3080421/javascript-color-gradient

    const percentFade = numAvail / maxAvail;

    let diffRed = endColor.red - startColor.red;
    let diffGreen = endColor.green - startColor.green;
    let diffBlue = endColor.blue - startColor.blue;

    diffRed = (diffRed * percentFade) + startColor.red;
    diffGreen = (diffGreen * percentFade) + startColor.green;
    diffBlue = (diffBlue * percentFade) + startColor.blue;

    const newColor = { backgroundColor: `rgb(${String(diffRed)},${String(diffGreen)},${String(diffBlue)})` };
    return (newColor);
  };

<<<<<<< HEAD
  // console.log(calcGradient(availableCount));
  return (calcGradient(availableCount));
=======
  console.log(calcGradient(count));
  return (calcGradient(count));
>>>>>>> 1e9bc4c206eb71340d8afe1d76f628c637ea11dd
}

export default color;
