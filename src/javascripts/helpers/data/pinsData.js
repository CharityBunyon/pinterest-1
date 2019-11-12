import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const changePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

const addNewPin = (newPin) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, newPin)
    .then((response) => {
      const newPinId = response.data;
      resolve(newPinId.name);
    }).catch((err) => reject(err));
});

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

export default { getAllPins, addNewPin, changePin };
