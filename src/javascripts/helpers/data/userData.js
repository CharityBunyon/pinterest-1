import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;
const getCurrentUid = () => firebase.auth().currentUser.uid;

const getCurrentUser = () => new Promise((resolve, reject) => {
  const currentUid = getCurrentUid();
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${currentUid}"`)
    .then((response) => {
      const activeUser = response.data;
      const newActiveUser = [];
      Object.keys(activeUser).forEach((fbId) => {
        activeUser[fbId].id = fbId;
        newActiveUser.push(activeUser[fbId]);
      });
      resolve(newActiveUser);
    }).catch((err) => reject(err));
});

export default { getCurrentUser };
