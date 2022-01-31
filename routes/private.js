const express = require("express");
const router = express.Router();
const { getUser, getAllStudents, getTeacher, getAllTeachers } = require('../controllers/private');
const { protect, isAdmin } = require('../middlewares/authProtect')
const User = require('../models/User')


router.route('/user').get(protect, getUser);


// admin routes
router.route('/admin').get(protect, isAdmin, getUser);
router.route('/admin/users').get(protect, isAdmin, getAllStudents);
router.route('/admin/teacher/:id').get(protect, isAdmin, getTeacher);
router.route('/admin/teachers').get(protect, isAdmin, getAllTeachers);


module.exports = router; 