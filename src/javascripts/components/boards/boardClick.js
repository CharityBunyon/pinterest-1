import $ from 'jquery';
import singleBoard from '../singleBoard/singleBoard';
import smash from '../../helpers/data/smash';

const printBrdPinEvent = (e) => {
  const bdId = $(e.target).closest('.pinTarget').attr('id').split('-')[1];
  console.log('brd click', bdId);
  smash.createBoardPins(bdId)
    .then((response) => {
      $('#boards').addClass('hide');
      $('#singleBoard').removeClass('hide');
      singleBoard.printBoardPins(response);
    }).catch((err) => console.error(err));
};

export default { printBrdPinEvent };
