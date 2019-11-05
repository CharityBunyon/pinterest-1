import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const getBoardPins = (selectedBoard) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userPins.json?orderBy="boardId"&equalTo="${selectedBoard}"`)
    .then((response) => {
      const boardPins = response.data;
      const newboardPins = [];
      Object.keys(boardPins).forEach((fbId) => {
        boardPins[fbId].id = fbId;
        newboardPins.push(boardPins[fbId]);
      });
      resolve(newboardPins);
    }).catch((err) => reject(err));
});

export default { getBoardPins };
