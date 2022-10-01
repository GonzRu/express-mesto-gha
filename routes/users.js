const router = require('express').Router();
const {
  getUsers, getUser, update, updateAvatar, getMe,
} = require('../controllers/usres');

router.get('/users/me', getMe);
router.patch('/users/me', update);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users', getUsers);
router.get('/users/:id', getUser);

module.exports = router;
