const router = require('express').Router();

const { authMiddleware } = require('./middleware/Auth');

const User = require('./api/User/userApi');
const Crate = require('./api/Crate/crateApi');

router.post('/auth/register', User.register);
router.post('/auth/login', User.login);

router.get('/user/crates', authMiddleware, Crate.getUserCrates);

module.exports = router;
