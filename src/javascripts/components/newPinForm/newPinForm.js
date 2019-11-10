import $ from 'jquery';
import utilities from '../../helpers/utilities';
import singlePin from '../singlePin/singlePin';
import pinsData from '../../helpers/data/pinsData';
import userPinData from '../../helpers/data/userPinData';

const printNewPinModal = () => {
  pinsData.getAllPins().then((allPinsArr) => {
    console.log(allPinsArr[0].category);
    let modalOptionsString = `
      <div class="form-group">
        <label for="categoryDropdown">Category</label>
        <select class="form-control" id="categoryDropdown">
      `;
    // loop categories forEach:
    allPinsArr.forEach((pin) => {
      modalOptionsString += ` 
        <option>${pin.category}</option>`;
    });
    userPinData.getAllUserPins().then((allUserPinsArr) => {
      console.log(allUserPinsArr[0].boardId);
      modalOptionsString += `
          </select>
        </div>
        <div class="form-group">
          <label for="boardDropdown">Board</label>
          <select class="form-control" id="boardDropdown">
      `;
      // loop boards forEach:
      allUserPinsArr.forEach((userPin) => {
        modalOptionsString += `
              <option value='${userPin.boardId}'>${userPin.boardName}</option>
        `;
      });
      // close loop
      modalOptionsString += '</select></div>';
      utilities.printToDom('dynamicAddPinModalDiv', modalOptionsString);
      $('#saveNewPin').click(singlePin.createPin);
    });
  }).catch((err) => console.error(err));
};

export default { printNewPinModal };
