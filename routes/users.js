const router = require('express').Router();

const { updateUserValidation } = require('../validations/usersValidation');

const { getUserId, updateUserProfile } = require('../controllers/users');

router.get('/users/me', getUserId); // Finding a user
router.patch('/users/me', updateUserValidation, updateUserProfile); // Profile update

module.exports = router;
