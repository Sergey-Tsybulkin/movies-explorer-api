const router = require('express').Router();

const { getUserId, updateUserProfile } = require('../controllers/users');
const { updateUserValidation } = require('../validations/usersValidation');

router.get('/users/me', getUserId);
router.patch('/users/me', updateUserValidation, updateUserProfile);

module.exports = router;
