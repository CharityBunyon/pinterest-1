import './userInfo.scss';
import $ from 'jquery';
import firebase from 'firebase/auth';
import currentUser from '../../helpers/data/userData';
import utilities from '../../helpers/utilities';

const createProfile = () => {
  const getCurrentUid = () => firebase.auth().currentUser.uid;
  const googleUid = getCurrentUid();
  const newUser = {
    name: $('#').val(),
    location: $('#').val(),
    joinDate: '',
    profilePic: $('#').val(),
    uid: googleUid,
  };
  currentUser.saveNewUser(newUser);
};

const printProfileInfo = () => {
  currentUser.getCurrentUser().then((user) => {
    const profileString = `
      <div class='col-sm-4 offset-sm-4 row d-flex'>
        <img id='profilePic' class='col-4' src=${user[0].profilePic} />
        <div id='profileText' class='col-7 offset-1 d-flex flex-column justify-content-center'>
          <h2>${user[0].name}</h2>
          <p>${user[0].location}</p>
          <p>Member Since: ${user[0].joinDate}</p>
        </div>
      </div>
    `;
    utilities.printToDom('profile', profileString);
  }).catch((err) => {
    $('#newUserModal').modal('show');
    $('#saveNewUser').click(createProfile);
    console.error(err);
  });
};

export default { printProfileInfo };
