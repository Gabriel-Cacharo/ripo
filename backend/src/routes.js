const router = require('express').Router();

const { authMiddleware } = require('./middleware/Auth');

const User = require('./api/User/userApi');
const Crate = require('./api/Crate/crateApi');
const Ripo = require('./api/Ripo/ripoApi');

router.post('/auth/register', User.register);
router.post('/auth/login', User.login);
router.post('/auth/forgotPassword', User.forgotPassword);
router.post('/auth/acceptForgotPassword', User.acceptForgotPassword);

router.post('/auth/admin/login', User.loginAdmin);

router.get('/crates/getUserCrates', authMiddleware, Crate.getUserCrates);
router.post('/crates/redeem', authMiddleware, Crate.redeemCrate);
router.post('/crates/buy', authMiddleware, Crate.buyCrate);
router.post('/crates/open', authMiddleware, Crate.openCrate);

router.put('/admin/ripos/editRipoBasicInformations', authMiddleware, Ripo.editRipoBasicInformations);

router.get('/ripos/getUserRipos', authMiddleware, Ripo.getUserRipos);
router.post('/ripos/sell', authMiddleware, Ripo.sellRipo);
router.post('/ripos/createUserRipo', authMiddleware, Ripo.createUserRipo);
router.get('/ripos/allClothes', authMiddleware, Ripo.getAllRipoClothes);
router.get('/ripos/owner', authMiddleware, User.getPublicRipoOwner);
router.get('/ripos/all', Ripo.getAllRipos);
router.post('/ripos/addUserRipos', Ripo.addUserRipos);

router.get('/users/all', User.getAllUsers);
router.post('/users/removeRipo', Ripo.removeUserRipo);

router.post('/admin/user/editUserBasicInformations', authMiddleware, User.editUserBasicInformations);

router.get('/user/searchProfile', authMiddleware, User.searchProfile);
router.get('/user/profile', authMiddleware, User.profile);
router.post('/user/updateFacRipos', authMiddleware, User.updateUserFacRipos);
router.post('/user/resetPassword', authMiddleware, User.resetUserPassword);
router.post('/user/verifyAccountEmail', authMiddleware, User.verifyAccountEmail);
router.get('/user/searchProfile/autocomplete', authMiddleware, User.searchProfileResponses);

module.exports = router;
