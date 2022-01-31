const express = require("express");
const router = express.Router();
const { getUser, getStudent, getAllStudents, getTeacher, getAllTeachers, updateProfile, } = require('../controllers/private');
const { protect, isAdmin } = require('../middlewares/authProtect')

// user routes
router.route('/user').get(protect, getUser);
router.route('/user/profile').post(protect, updateProfile);


// admin routes
router.route('/admin').get(protect, isAdmin, getUser);
router.route('/admin/user/:id').get(protect, isAdmin, getStudent);
router.route('/admin/users').get(protect, isAdmin, getAllStudents);
router.route('/admin/teacher/:id').get(protect, isAdmin, getTeacher);
router.route('/admin/teachers').get(protect, isAdmin, getAllTeachers);


module.exports = router; 