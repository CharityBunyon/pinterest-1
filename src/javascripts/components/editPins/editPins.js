import $ from 'jquery';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';
import pinForm from '../newPinForm/newPinForm';
import singleBoard from '../singleBoard/singleBoard';
import pinsData from '../../helpers/data/pinsData';
import userPinsData from '../../helpers/data/userPinData';

const editPinSubmit = (pinObj) => {
  const updatedPin = {
    title: $('#pin-title').val(),
    description: $('#pin-description').val(),
    imgUrl: $('#pin-imgUrl').val(),
    siteUrl: $('#pin-siteUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  const updatedUserPin = {
    uid: pinObj.uid,
    pinId: pinObj.pinId,
    comment: $('#pin-comment').val(),
    boardId: $('#boardDropdown').val(),
    hasTried: $('#hasTriedCheck').is(':checked'),
  };
  pinsData.changePin(pinObj.pinId, updatedPin).then(() => {
    userPinsData.changeUserPin(pinObj.id, updatedUserPin).then(() => {
      smash.createBoardPins(updatedUserPin.boardId).then((response) => {
        $('#boards').addClass('hide');
        $('#addNew').addClass('hide');
        $('#singleBoard').removeClass('hide');
        singleBoard.printBoardPins(response);
        $('#addPinForm').trigger('reset');
        $('#saveNewPin').removeClass('hide');
        $('#savePinUpdate').addClass('hide');
        $('#newPinModal').modal('hide');
        $('#pinModal').modal('hide');
      });
    });
  }).catch((err) => console.error(err));
};

const editPinModal = (boardId, userPinId) => new Promise((resolve, reject) => {
  smash.createBoardPins(boardId).then((response) => {
    const brdPins = response;
    const pinToEdit = brdPins.find((x) => x.id === userPinId);
    $('#newPinModal').modal('show');
    $('#saveNewPin').addClass('hide');
    $('#savePinUpdate').removeClass('hide');
    pinForm.printNewPinModal().then((formString) => {
      utilities.printToDom('dynamicAddPinModalDiv', formString);
      $('#pin-title').val(pinToEdit.title);
      $('#pin-description').val(pinToEdit.description);
      $('#pin-imgUrl').val(pinToEdit.imgUrl);
      $('#pin-siteUrl').val(pinToEdit.siteUrl);
      $('#pin-comment').val(pinToEdit.comment);
      $(`select#categoryDropdown option[value='${pinToEdit.category}']`).prop('selected', true);
      $(`select#boardDropdown option[value='${pinToEdit.boardId}']`).prop('selected', true);
      if (pinToEdit.hasTried) {
        $('#hasTriedCheck').prop('checked', true);
      }
      $('#savePinUpdate').click(() => {
        editPinSubmit(pinToEdit);
      });
      resolve();
    });
  }).catch((err) => reject(err));
});

const updatePin = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('_edit_')[1];
  const userPinId = e.target.id.split('_edit_')[0];
  editPinModal(boardId, userPinId)
    .then(() => {
    }).catch((err) => console.error(err));
};

export default { editPinModal, updatePin };
