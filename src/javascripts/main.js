import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import myNav from './components/myNav/myNav';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  auth.printLoginBtn();
  authData.checkLoginStatus();
  myNav.logoutEvent();
};

init();
