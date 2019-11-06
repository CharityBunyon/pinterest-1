import './myNav.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const loginBtn = $('#loginBtn');
const boardsBtn = $('#boardNav');
const logoutBtn = $('#logoutBtn');
const navToggle = $('#navToggle');
const boardDiv = $('#boards');
const singleBoard = $('#singleBoard');

const logoutEvent = () => {
  logoutBtn.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        boardDiv.html('');
        $('#profile').html('');
        boardDiv.addClass('hide');
        boardsBtn.addClass('hide');
        logoutBtn.addClass('hide');
        navToggle.addClass('hide');
        singleBoard.addClass('hide');
        loginBtn.removeClass('hide');
        authDiv.removeClass('hide');
      }).catch((err) => console.error('you are still logged in', err));
  });
};

export default { logoutEvent };
