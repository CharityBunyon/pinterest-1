import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';
import currentUser from '../../components/userInfo/userInfo';
import boardBtn from '../../components/singleBoard/boardsBtn';

const authDiv = $('#auth');
const loginBtn = $('#loginBtn');
const boardsBtn = $('#boardNav');
const logoutBtn = $('#logoutBtn');
const navToggle = $('#navToggle');
const boardDiv = $('#boards');
const addNew = $('#addNew');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      boardDiv.removeClass('hide');
      boardsBtn.removeClass('hide');
      logoutBtn.removeClass('hide');
      navToggle.removeClass('hide');
      addNew.removeClass('hide');
      loginBtn.addClass('hide');
      authDiv.addClass('hide');
      currentUser.printProfileInfo();
      boards.printActiveUserBoards();
      boardsBtn.click(boardBtn.showUserBoards);
    } else {
      boardDiv.addClass('hide');
      boardsBtn.addClass('hide');
      logoutBtn.addClass('hide');
      navToggle.addClass('hide');
      addNew.addClass('hide');
      loginBtn.removeClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
