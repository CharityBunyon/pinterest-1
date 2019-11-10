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
      <h2 class='col-10'>${pinArr[0].boardName ? pinArr[0].boardName : pinArr[0].name}</h2>
      <p class='p-0 text-center col-1 createPin' id='addPin' data-toggle='modal' data-target='#newPinModal'>+</p>
      <img id='delBrd-${pinArr[0].boardId ? pinArr[0].boardId : pinArr[0].id}' alt='delete' title='Delete ${pinArr[0].boardName ? pinArr[0].boardName : pinArr[0].name}' 
      class='col-1 brdTarget del-brd' src='${delIcon}' />
    </div>
  `;
  if (pinArr[0].imgUrl) {
    pinString += '<div class="row d-flex flex-wrap justify-content-around text-center">';
    pinArr.forEach((pin) => {
      pinString += `<img id='${pin.id}-pin-${pin.boardId}' class='card pinImg col-sm-3 m-sm-2 align-self-center' data-toggle="modal" data-target="#pinModal" src=${pin.imgUrl} />`;
    });
    pinString += '</div>';
  } else {
    pinString += '<p>This Board is Empty 🥺 Pin Something!</p>';
  }
  utilities.printToDom('singleBoard', pinString);
  $('#singleBoard').on('click', '.del-brd', discardBoard);
};

export default { printBoardPins };
