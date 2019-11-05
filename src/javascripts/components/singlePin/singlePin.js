import './singlePin.scss';


const printPin = (e, allBrdPins) => {
  const pin = e.target.id;
  console.log(pin, allBrdPins);
};

export default { printPin };
