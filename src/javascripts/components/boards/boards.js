import './boards.scss';
import $ from 'jquery';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import singleBoard from '../singleBoard/singleBoard';

const printActiveUserBoards = () => {
  smash.getBoardAndImg()
    .then((boards) => {
      let boardString = `
      <h2>Boards</h2>
      <div id='userBoardDiv' class='row d-flex flex-wrap justify-content-around'>
      `;
      boards.forEach((board) => {
        boardString += `
        <div id=${board.id} class='card boardCards col-sm-3 m-2'>
        <h3 class='text-center'>${board.name}</h3>
        <img class='card-img boardCover' src=${board.imgUrl} />
        </div>
        `;
      });
      boardString += '</div>';
      utilities.printToDom('boards', boardString);
      $('#boards').on('click', '.boardCards', (e) => {
        smash.createBoardPins(e)
          .then((response) => {
            $('#boards').addClass('hide');
            $('#singleBoard').removeClass('hide');
            singleBoard.printBoardPins(response);
          }).catch((err) => console.error(err));
      });
    }).catch((err) => console.error(err));
};

export default { printActiveUserBoards };