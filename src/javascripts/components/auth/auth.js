import './auth.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import icon from '../../../assets/images/googCircleIcon.png';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const printLoginBtn = () => {
  const loginString = `
    <button id='loginBtn' class='btn btn-light'>
      <img id='googIcon' src=${icon} />
      Sign in with Google
    </button>
  `;
  utilities.printToDom('auth', loginString);
  $('#loginBtn').click(signMeIn);
};

export default { printLoginBtn };
