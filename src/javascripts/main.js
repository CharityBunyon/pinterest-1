import 'bootstrap';
import '../styles/main.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import myNav from './components/myNav/myNav';
import smash from './helpers/data/smash';
import singlePin from './components/singlePin/singlePin';
import brdClick from './components/boards/boardClick';
import addPin from './components/newPinForm/newPinForm';
import boards from './components/boards/boards';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  auth.printLoginBtn();
  authData.checkLoginStatus();
  myNav.logoutEvent();
  $('#boards').on('click', '.boardCards', (e) => brdClick.printBrdPinEvent(e));
  $('#saveNewBoard').click(boards.createBoard);
  $(document).on('click', '.createPin', addPin.printNewPinModal);
  $(document).on('click', '.pinImg', (e) => {
    const brdId = e.target.id.split('-pin-')[1];
    smash.createBoardPins(brdId).then((response) => {
      console.log('pin click id', brdId);
      singlePin.printPin(e, response);
    }).catch((err) => console.error(err));
  });
};

init();
