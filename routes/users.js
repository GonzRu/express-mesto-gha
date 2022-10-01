const router = require('express').Router();
const {
  getUsers, getUser, createUser, update, updateAvatar, getMe, login,
} = require('../controllers/usres');

router.get('/users/me', getMe);
router.patch('/users/me', update);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
