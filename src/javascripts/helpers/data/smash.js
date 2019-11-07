import boardData from './boardsData';
import userPins from './userPinData';
import pins from './pinsData';
import singleBoard from './singleBoardData';


const getBoardAndImg = () => new Promise((resolve, reject) => {
  boardData.getAllBoards()
    .then((boards) => {
      userPins.getAllUserPins().then((userPin) => {
        pins.getAllPins().then((pin) => {
          const activeBoards = [];
          boards.forEach((brd) => {
            const newBrds = { ...brd };
            const matchPins = userPin.find((x) => x.boardId === newBrds.id);
            const coverImg = pin.find((y) => y.id === matchPins.pinId);
            newBrds.imgUrl = coverImg.imgUrl;
            activeBoards.push(newBrds);
          });
          resolve(activeBoards);
        });
      });
    }).catch((err) => reject(err));
});

const createBoardPins = (brdId) => new Promise((resolve, reject) => {
  singleBoard.getBoardPins(brdId)
    .then((boardPins) => {
      pins.getAllPins().then((allPins) => {
        boardData.getAllBoards().then((brds) => {
          const allBoardPins = [];
          boardPins.forEach((pin) => {
            const newAllBoardPins = { ...pin };
            const brdName = brds.find((y) => y.id === pin.boardId);
            const matchPins = allPins.find((x) => x.id === pin.pinId);
            newAllBoardPins.boardName = brdName.name;
            newAllBoardPins.imgUrl = matchPins.imgUrl;
            newAllBoardPins.siteUrl = matchPins.siteUrl;
            newAllBoardPins.title = matchPins.title;
            newAllBoardPins.description = matchPins.description;
            allBoardPins.push(newAllBoardPins);
          });
          resolve(allBoardPins);
        });
      });
    }).catch((err) => reject(err));
});

export default { getBoardAndImg, createBoardPins };
