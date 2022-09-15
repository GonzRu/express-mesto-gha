const router = require('express').Router();
const { signIn } = require('../controllers/auth');

router.post('/signin', signIn);

module.exports = router;
