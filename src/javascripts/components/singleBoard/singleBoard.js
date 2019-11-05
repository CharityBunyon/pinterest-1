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
      <img class='card col-sm-3 m-sm-2 align-self-center' src=${pin.imgUrl} />
    `;
  });
  pinString += '</div>';
  utilities.printToDom('singleBoard', pinString);
  $('#singleBoard').on('click', '.pinImg', singlePin.printPin);
};

export default { printBoardPins };
