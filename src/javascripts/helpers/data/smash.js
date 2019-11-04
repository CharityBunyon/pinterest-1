import boardData from './boardsData';
import userPins from './userPinData';
import pins from './pinsData';

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

export default { getBoardAndImg };
