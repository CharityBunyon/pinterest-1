import './boards.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import noImg from '../../../assets/images/no-img.png';


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

export default { printActiveUserBoards };
