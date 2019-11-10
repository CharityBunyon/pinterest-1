import smash from '../../helpers/data/smash';
import pinsData from '../../helpers/data/pinsData';
import userPinsData from '../../helpers/data/userPinData';

// give edit button id with board and userpinid
// add update button to pin modal & set to hide
// call smash passing in board id !!!
// use find on userpinid to save obj !!!
// console.log obj to confirm !!!
// launch modal with fields populated from obj
// hide save button show update button
// on update submit create pin obj and userpin obj !!!
// update pin/userPin objs to use input values !!!
// run changePin passing in pin obj & id !!!
// run changeUserPin passing in userpin obj & id !!!
// resolve

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
  pinsData.changePin(pinObj.pinId, updatedPin);
  userPinsData.changeUserPin(pinObj.id, updatedUserPin);
  // toggle update/save btns
};

const editPinModal = (boardId, userPinId) => new Promise((resolve, reject) => {
  smash.createBoardPins(boardId).then((response) => {
    const brdPins = response.data;
    const pinToEdit = brdPins.find((x) => x.id === userPinId);
    console.log(pinToEdit);
    // launch modal with fields populated from obj
    // hide save button show update button
    // event listener pass pinToEdit
    $('#updateBtn').click(editPinSubmit(pinToEdit));
    resolve();
  }).catch((err) => reject(err));
});

export default { editPinModal };
