const express = require('express');
const {registerUser,getAllUsers,authUser} = require('../controller/userController');
const validateUser = require('../middleware/authMiddleware');

const router = express.Router();


router.route("/").post(registerUser).get(validateUser,getAllUsers);
// router.post('/login',authUser);
router.route('/all').get(getAllUsers);

router.route('/login').post(authUser);

module.exports = router;