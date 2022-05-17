const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpassword, changepassword } = require('../controllers/auth')

// router.route("/register").post(register)

router.post("/register", async (req, res, next) => { await register(req.body, 'student', res, next) });

router.post("/register-teacher", async (req, res, next) => { await register(req.body, 'teacher', res, next) });

router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/changepassword/:id").post(changepassword)

module.exports = router