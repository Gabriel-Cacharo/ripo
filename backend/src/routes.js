const router = require('express').Router();

const { authMiddleware, authAdminMiddleware } = require('./middleware/Auth');

const User = require('./api/User/userApi');
const Crate = require('./api/Crate/crateApi');
const Ripo = require('./api/Ripo/ripoApi');

// Admin Routes
router.post('/auth/admin/login', User.loginAdmin);

router.get('/admin/crates/all', authAdminMiddleware, Crate.getAllCrates);
router.post('/admin/crates/add', authAdminMiddleware, Crate.addUserCrate);
router.put('/admin/crates/editCrateBasicInformations', authAdminMiddleware, Crate.editCrateBasicInformations);
router.put('/admin/crates/editCrateDrops', authAdminMiddleware, Crate.editCrateDrops);

router.get('/admin/user/searchProfile', authAdminMiddleware, User.searchProfileWithCrates);
router.post('/admin/user/editUserBasicInformations', authAdminMiddleware, User.editUserBasicInformations);

router.get('/admin/crates/getSpecificUserCrates', Crate.getSpecificUserCrates);

router.put('/admin/ripos/editRipoBasicInformations', authMiddleware, Ripo.editRipoBasicInformations);

// User Routes
router.post('/auth/register', User.register);
router.post('/auth/login', User.login);
router.post('/auth/forgotPassword', User.forgotPassword);
router.post('/auth/acceptForgotPassword', User.acceptForgotPassword);

router.get('/ripos/getUserRipos', authMiddleware, Ripo.getUserRipos);
router.post('/ripos/sell', authMiddleware, Ripo.sellRipo);
router.post('/ripos/createUserRipo', authMiddleware, Ripo.createUserRipo);
router.get('/ripos/allClothes', authMiddleware, Ripo.getAllRipoClothes);
router.get('/ripos/owner', authMiddleware, User.getPublicRipoOwner);
router.get('/ripos/all', Ripo.getAllRipos);
router.post('/ripos/addUserRipos', Ripo.addUserRipos);

router.get('/crates/getUserCrates', authMiddleware, Crate.getUserCrates);
router.post('/crates/redeem', authMiddleware, Crate.redeemCrate);
router.post('/crates/buy', authMiddleware, Crate.buyCrate);
router.post('/crates/open', authMiddleware, Crate.openCrate);

router.get('/users/all', User.getAllUsers);
router.post('/users/removeRipo', Ripo.removeUserRipo);
router.post('/users/removeCrate', Crate.removeUserCrate);

router.get('/user/searchProfile', authMiddleware, User.searchProfile);
router.get('/user/profile', authMiddleware, User.profile);
router.post('/user/updateFacRipos', authMiddleware, User.updateUserFacRipos);
router.post('/user/resetPassword', authMiddleware, User.resetUserPassword);
router.post('/user/verifyAccountEmail', authMiddleware, User.verifyAccountEmail);
router.get('/user/searchProfile/autocomplete', authMiddleware, User.searchProfileResponses);

module.exports = router;
