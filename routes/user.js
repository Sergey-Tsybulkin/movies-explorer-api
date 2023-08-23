const router = require('express').Router();

const { updateUserValidation } = require('../validations/usersValidation');

const { getUserId, updateUserProfile } = require('../controllers/user');

router.get('/me', getUserId); // Finding a user
router.patch('/me', updateUserValidation, updateUserProfile); // Profile update
router.post('/me/signout', signout);

module.exports = router;
