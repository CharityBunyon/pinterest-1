import './singlePin.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import delIcon from '../../../assets/images/trash-icon.png';
// import boards from '../boards/boards';
import userPinData from '../../helpers/data/userPinData';

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const toDelete = e.target.id.split('del-')[1];
  console.log('click1');
  userPinData.deleteUserPin(toDelete)
    .then(() => {
      console.log('click2');
      $('#pinModal').modal('hide');
      // boards.printBrdPinEvent(e);
    })
    .catch((err) => console.log(err));
};

const printPin = (e, allBrdPins) => {
  const pin = e.target.id;
  allBrdPins.forEach((item) => {
    if (item.id === pin) {
      const pinString = `
        <div class="modal-header">
          <h3 class="modal-title col-10" id="pinModalLabel">${item.title}</h3>
          <img id='del-${item.id}' class='col-1 del-pin' src='${delIcon}' />
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
      $(`#del-${item.id}`).click(deletePin);
    }
  });
};

export default { printPin };
