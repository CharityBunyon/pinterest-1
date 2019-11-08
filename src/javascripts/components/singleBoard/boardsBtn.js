import $ from 'jquery';
import boards from '../boards/boards';
// import smash from '../../helpers/data/smash';
// import singleBoard from './singleBoard';

const showUserBoards = () => {
  $('#singleBoard').html('');
  $('#singleBoard').addClass('hide');
  $('#boards').removeClass('hide');
  boards.printActiveUserBoards();
};

export default { showUserBoards };
