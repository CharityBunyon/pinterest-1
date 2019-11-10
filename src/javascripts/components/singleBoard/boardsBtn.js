import $ from 'jquery';
import boards from '../boards/boards';

const showUserBoards = () => {
  $('#singleBoard').html('');
  $('#singleBoard').addClass('hide');
  $('#boards').removeClass('hide');
  $('#addNew').removeClass('hide');
  boards.printActiveUserBoards();
};

export default { showUserBoards };
