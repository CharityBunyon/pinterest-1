import './singleBoard.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import singlePin from '../singlePin/singlePin';

const printBoardPins = (pinArr) => {
  let pinString = `
    <h2>${pinArr[0].boardName}</h2>
    <div class='row d-flex flex-wrap justify-content-around text-center'>
  `;
  pinArr.forEach((pin) => {
    pinString += `
      <img id=${pin.id} class='card pinImg col-sm-3 m-sm-2 align-self-center' src=${pin.imgUrl} />
    `;
  });
  pinString += '</div>';
  utilities.printToDom('singleBoard', pinString);
  const newPinArr = { ...pinArr };
  $('#singleBoard').on('click', '.pinImg', (e) => {
    singlePin.printPin(e, newPinArr);
  });
};

export default { printBoardPins };
