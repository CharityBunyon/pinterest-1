import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;
const getCurrentUid = () => firebase.auth().currentUser.uid;

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const getAllBoards = () => new Promise((resolve, reject) => {
  const currentUid = getCurrentUid();
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${currentUid}"`)
    .then((response) => {
      const userBoards = response.data;
      const newUserBoards = [];
      Object.keys(userBoards).forEach((fbId) => {
        userBoards[fbId].id = fbId;
        newUserBoards.push(userBoards[fbId]);
      });
      resolve(newUserBoards);
    }).catch((err) => reject(err));
});

export default { getAllBoards, deleteBoard };
