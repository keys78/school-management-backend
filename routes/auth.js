const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpassword, changepassword } = require('../controllers/auth')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/changepassword/:id").patch(changepassword)

module.exports = router