import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const authDiv = $('#auth');
const loginBtn = $('#loginBtn');
const boardsBtn = $('#boardNav');
const logoutBtn = $('#logoutBtn');
const navToggle = $('#navToggle');
const boardDiv = $('#boards');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      boardDiv.removeClass('hide');
      boardsBtn.removeClass('hide');
      logoutBtn.removeClass('hide');
      navToggle.removeClass('hide');
      loginBtn.addClass('hide');
      authDiv.addClass('hide');
      boards.printActiveUserBoards();
    } else {
      boardDiv.addClass('hide');
      boardsBtn.addClass('hide');
      logoutBtn.addClass('hide');
      navToggle.addClass('hide');
      loginBtn.removeClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
