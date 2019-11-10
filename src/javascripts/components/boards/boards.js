import './boards.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import noImg from '../../../assets/images/no-img.png';
import boardData from '../../helpers/data/boardsData';

const printActiveUserBoards = () => {
  smash.getBoardAndImg()
    .then((boards) => {
      let boardString = `
      <h2>Boards</h2>
      <div id='userBoardDiv' class='row d-flex flex-wrap justify-content-around'>
      `;
      boards.forEach((board) => {
        boardString += `
        <div id='brd_splt_${board.id}' class='card pinTarget boardCards col-sm-3 m-2'>
        <h3 class='text-center'>${board.name}</h3>
        <img class='card-img boardCover' src=${board.imgUrl ? board.imgUrl : noImg} />
        </div>
        `;
      });
      boardString += '</div>';
      utilities.printToDom('boards', boardString);
    }).catch((err) => console.error(err));
};

const createBoard = (e) => {
  e.stopImmediatePropagation();
  console.log('clicked save board');
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    uid,
    name: $('#board-title').val(),
    isPrivate: $('#isPrivateCheck').is(':checked'),
  };
  boardData.addNewBoard(newBoard).then(() => {
    console.log('added board');
    $('#newBoardModal').modal('hide');
    printActiveUserBoards();
    $('#addBoardForm').trigger('reset');
  }).catch((err) => console.error(err));
};

export default { printActiveUserBoards, createBoard };
