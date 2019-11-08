import './singleBoard.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import delIcon from '../../../assets/images/trash-icon.png';
import boardData from '../../helpers/data/boardsData';
import singleBoardData from '../../helpers/data/singleBoardData';
import userPinData from '../../helpers/data/userPinData';
import boardsbtn from './boardsBtn';

const discardBoard = (e) => {
  e.stopImmediatePropagation();
  const brdId = e.target.id.split('delBrd-')[1];
  boardData.deleteBoard(brdId)
    .then(() => {
      singleBoardData.getBoardPins(brdId).then((brdPins) => {
        brdPins.forEach((brdPin) => userPinData.deleteUserPin(brdPin.id));
        boardsbtn.showUserBoards();
      });
    }).catch((err) => console.error(err));
};

const printBoardPins = (pinArr) => {
  let pinString = `
    <div class='row d-flex mb-3'>
      <h2 class='col-11'>${pinArr[0].boardName}</h2>
      <img id='delBrd-${pinArr[0].boardId}' alt='delete' title='Delete ${pinArr[0].boardName}' class='col-1 brdTarget del-brd' src='${delIcon}' />
    </div>
    <div class='row d-flex flex-wrap justify-content-around text-center'>
  `;
  pinArr.forEach((pin) => {
    pinString += `
      <img id='${pin.id}-pin-${pin.boardId}' class='card pinImg col-sm-3 m-sm-2 align-self-center' data-toggle="modal" data-target="#pinModal" src=${pin.imgUrl} />
    `;
  });
  pinString += '</div>';
  utilities.printToDom('singleBoard', pinString);
  $('#singleBoard').on('click', '.del-brd', discardBoard);
};

export default { printBoardPins };
