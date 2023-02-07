const router = require('express').Router();

const { authMiddleware } = require('./middleware/Auth');

const User = require('./api/User/userApi');

router.post('/auth/register', User.register);
router.post('/auth/login', User.login);

module.exports = router;
