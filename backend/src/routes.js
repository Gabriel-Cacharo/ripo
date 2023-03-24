const router = require('express').Router();

const { authMiddleware } = require('./middleware/Auth');

const User = require('./api/User/userApi');
const Crate = require('./api/Crate/crateApi');
const Ripo = require('./api/Ripo/ripoApi');

router.post('/auth/register', User.register);
router.post('/auth/login', User.login);

router.get('/crates/getUserCrates', authMiddleware, Crate.getUserCrates);
router.post('/crates/redeem', authMiddleware, Crate.redeemCrate);
router.post('/crates/buy', authMiddleware, Crate.buyCrate);
router.post('/crates/open', authMiddleware, Crate.openCrate);

router.get('/ripos/getUserRipos', authMiddleware, Ripo.getUserRipos);
router.post('/ripos/sell', authMiddleware, Ripo.sellRipo);
router.post('/ripos/createUserRipo', authMiddleware, Ripo.createUserRipo);
router.get('/ripos/allClothes', authMiddleware, Ripo.getAllRipoClothes);
router.get('/ripos/owner', authMiddleware, User.getPublicRipoOwner);

router.get('/user/searchProfile', User.searchProfile);
router.get('/user/profile', authMiddleware, User.profile);
router.post('/user/updateFacRipos', authMiddleware, User.updateUserFacRipos);

module.exports = router;
