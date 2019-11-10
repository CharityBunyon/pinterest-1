import './singlePin.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import delIcon from '../../../assets/images/trash-icon.png';
import boardClick from '../boards/boardClick';
import userPinData from '../../helpers/data/userPinData';
import pins from '../../helpers/data/pinsData';
import smash from '../../helpers/data/smash';
import singleBoard from '../singleBoard/singleBoard';


const createPin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newPin = {
    title: $('#pin-title').val(),
    description: $('#pin-description').val(),
    imgUrl: $('#pin-imgUrl').val(),
    siteUrl: $('#pin-siteUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  const board = $('#boardDropdown').val();
  console.log(newPin, $('#hasTriedCheck').is(':checked'));
  pins.addNewPin(newPin).then((newPinId) => {
    console.log(newPinId);
    const newUserPin = {
      uid,
      pinId: newPinId,
      comment: $('#pin-comment').val(),
      boardId: board,
      hasTried: $('#hasTriedCheck').is(':checked'),
    };
    userPinData.addNewUserPin(newUserPin).then(() => {
      $('#newPinModal').modal('hide');
      smash.createBoardPins(board).then((response) => {
        $('#boards').addClass('hide');
        $('#addNew').addClass('hide');
        $('#singleBoard').removeClass('hide');
        singleBoard.printBoardPins(response);
        $('#addPinForm').trigger('reset');
      });
    });
  }).catch((err) => console.error(err));
};

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const toDelete = e.target.id.split('_splt_')[0];
  userPinData.deleteUserPin(toDelete)
    .then(() => {
      $('#pinModal').modal('hide');
      boardClick.printBrdPinEvent(e);
    })
    .catch((err) => console.error(err));
};

const printPin = (e, allBrdPins) => {
  const pin = e.target.id.split('-pin-')[0];
  console.log('printPin', pin);
  allBrdPins.forEach((item) => {
    if (item.id === pin) {
      const pinString = `
        <div class="modal-header">
          <h3 class="modal-title col-10" id="pinModalLabel">${item.title}</h3>
          <img id='${item.id}_splt_${item.boardId}' class='col-1 pinTarget del-pin' src='${delIcon}' />
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <img class='card-img' src='${item.imgUrl}' />
          </div>
          <div>
            <p class='text-center description'>${item.description}</p>
            <a target='_blank' href='${item.siteUrl}'><p class='text-center'>Visit Website</p></a>
            <div class='modal-footer text-left p-0'>
              <p class='col-12 m-0'>Pinner Comment:</p>
              <p class='col-12 ml-2 comment'>${item.comment}</p>
            </div>
          </div>
        </div>
      `;
      utilities.printToDom('dynamicModalDiv', pinString);
      $(`#${item.id}_splt_${item.boardId}`).click(deletePin);
    }
  });
};

export default { printPin, createPin };
