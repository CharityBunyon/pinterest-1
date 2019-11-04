import smash from '../../helpers/data/smash';

const printActiveUserBoards = () => {
  smash.getBoardAndImg()
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default { printActiveUserBoards };
