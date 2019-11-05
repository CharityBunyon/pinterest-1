import './singleBoard.scss';
import $ from 'jquery';
import singleBoard from '../../helpers/data/singleBoardData';
// import pins from '../../helpers/data/pinsData';

const printBoardPins = (e) => {
  singleBoard.getBoardPins($(e.target).closest('.card').attr('id'))
    .then((allPins) => {
      console.log(allPins);
    }).catch((err) => console.error(err));
};

export default { printBoardPins };
