import './singleBoard.scss';
import utilities from '../../helpers/utilities';

const printBoardPins = (pinArr) => {
  let pinString = `
    <h2>${pinArr[0].boardName}</h2>
    <div class='row d-flex flex-wrap justify-content-around text-center'>
  `;
  pinArr.forEach((pin) => {
    pinString += `
      <img id='${pin.id}-pin-${pin.boardId}' class='card pinImg col-sm-3 m-sm-2 align-self-center' data-toggle="modal" data-target="#pinModal" src=${pin.imgUrl} />
    `;
  });
  pinString += '</div>';
  utilities.printToDom('singleBoard', pinString);
};

export default { printBoardPins };
