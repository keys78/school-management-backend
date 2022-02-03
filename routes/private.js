const express = require("express");
const { registerCourse, updateScore, selectDepartment  } = require("../controllers/course-controller");
const router = express.Router();
const { getUser, getStudent, getAllStudents, getTeacher, getAllTeachers, updateProfile, deleteUser, } = require('../controllers/private');
const { protect, isAdmin, isTeacherAndAdmin } = require('../middlewares/authProtect');
const { Course } = require("../models/Levels");
const User = require("../models/User");

// user routes
router.route('/user').get(protect, getUser);
router.route('/profile').post(protect, updateProfile);
router.route('/register-course/:id').post(protect, registerCourse) //userId


router.route('/update-score/:id').put(protect, isTeacherAndAdmin, updateScore) //courseId

router.route('/select-department').post(selectDepartment)


// admin routes
router.route('/admin').get(protect, isAdmin, getUser);
router.route('/admin/user/:id').get(protect, isAdmin, getStudent);
router.route('/admin/users').get(protect, isAdmin, getAllStudents);
router.route('/admin/teacher/:id').get(protect, isAdmin, getTeacher);
router.route('/admin/teachers').get(protect, isAdmin, getAllTeachers);
router.route('/admin/delete-user/:id').delete(protect, isAdmin, deleteUser);


module.exports = router; 