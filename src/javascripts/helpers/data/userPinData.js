import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;
const getCurrentUid = () => firebase.auth().currentUser.uid;

const getAllUserPins = () => new Promise((resolve, reject) => {
  const currentUid = getCurrentUid();
  axios.get(`${baseUrl}/userPins.json?orderBy="uid"&equalTo="${currentUid}"`)
    .then((response) => {
      const activeUserPins = response.data;
      const newActiveUserPins = [];
      Object.keys(activeUserPins).forEach((fbId) => {
        activeUserPins[fbId].id = fbId;
        newActiveUserPins.push(activeUserPins[fbId]);
      });
      resolve(newActiveUserPins);
    }).catch((err) => reject(err));
});

export default { getAllUserPins };
