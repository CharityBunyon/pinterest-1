import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const activePins = response.data;
      const newActivePins = [];
      Object.keys(activePins).forEach((fbId) => {
        activePins[fbId].id = fbId;
        newActivePins.push(activePins[fbId]);
      });
      resolve(newActivePins);
    }).catch((err) => reject(err));
});

export default { getAllPins };
