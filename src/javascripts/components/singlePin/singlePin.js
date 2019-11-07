import './singlePin.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import delIcon from '../../../assets/images/trash-icon.png';
import boards from '../boards/boards';
import userPinData from '../../helpers/data/userPinData';

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const toDelete = e.target.id.split('-')[0];
  userPinData.deleteUserPin(toDelete)
    .then(() => {
      console.log('del split', e.target.id, e.target.id.split('-')[1]);
      $('#pinModal').modal('hide');
      boards.printBrdPinEvent(e);
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
          <img id='${item.id}-${item.boardId}' class='col-1 pinTarget del-pin' src='${delIcon}' />
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
      $(`#${item.id}-${item.boardId}`).click(deletePin);
    }
  });
};

export default { printPin };
