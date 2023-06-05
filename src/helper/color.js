function color(props) {
  const { count } = props;
  const maxAvail = props.max;

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

  console.log(calcGradient(count));
  return (calcGradient(count));
}

export default color;
