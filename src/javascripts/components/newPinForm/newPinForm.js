// import $ from 'jquery';
// import utilities from '../../helpers/utilities';
// import singlePin from '../singlePin/singlePin';
import pinsData from '../../helpers/data/pinsData';
import boardData from '../../helpers/data/boardsData';

const printNewPinModal = () => new Promise((resolve, reject) => {
  pinsData.getAllPins().then((allPinsArr) => {
    let modalOptionsString = `
      <div class="form-group">
        <label for="categoryDropdown">Category</label>
        <select class="form-control" id="categoryDropdown">
    `;
    const newPinsArr = [];
    allPinsArr.forEach((pin) => {
      const allPins = { ...pin };
      newPinsArr.push(allPins.category);
    });
    const categoryList = newPinsArr.filter((item, index) => newPinsArr.indexOf(item) === index);
    categoryList.forEach((category) => {
      modalOptionsString += ` 
        <option value='${category}'>${category}</option>`;
    });
    boardData.getAllBoards().then((allBoardssArr) => {
      console.log('brdId in form', allBoardssArr[0].boardId);
      modalOptionsString += `
          </select>
        </div>
        <div class="form-group">
          <label for="boardDropdown">Board</label>
          <select class="form-control" id="boardDropdown">
      `;
      allBoardssArr.forEach((board) => {
        modalOptionsString += `
              <option value='${board.id}'>${board.name}</option>
        `;
      });
      modalOptionsString += '</select></div>';
      resolve(modalOptionsString);
    });
  }).catch((err) => reject(err));
});

export default { printNewPinModal };
