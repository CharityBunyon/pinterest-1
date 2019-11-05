import './singleBoard.scss';
import utilities from '../../helpers/utilities';
// import $ from 'jquery';

const printBoardPins = (pinArr) => {
  let pinString = `
    <h2>${pinArr[0].boardId}</h2>
    <div class='row d-flex flex-wrap justify-content-around'>
  `;
  pinArr.forEach((pin) => {
    pinString += `
    <div class='card col-sm-3 m-sm-2'>
      <img class='card-img' src=${pin.imgUrl} />
    </div>
    `;
  });
  pinString += '</div>';
  utilities.printToDom('singleBoard', pinString);
};

export default { printBoardPins };
