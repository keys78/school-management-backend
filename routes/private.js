const express = require("express");
const { registerCourse, viewCourses  } = require("../controllers/course-controller");
const router = express.Router();
const { getUser, getStudent, getAllStudents, getTeacher, getAllTeachers, updateProfile, deleteUser, } = require('../controllers/private');
const { protect, isAdmin } = require('../middlewares/authProtect')

// user routes
router.route('/user').get(protect, getUser);
router.route('/profile').post(protect, updateProfile);

router.route('/register-course').post(protect, registerCourse);
router.route('/view-course').get(protect, viewCourses);


// admin routes
router.route('/admin').get(protect, isAdmin, getUser);
router.route('/admin/user/:id').get(protect, isAdmin, getStudent);
router.route('/admin/users').get(protect, isAdmin, getAllStudents);
router.route('/admin/teacher/:id').get(protect, isAdmin, getTeacher);
router.route('/admin/teachers').get(protect, isAdmin, getAllTeachers);
router.route('/admin/delete-user/:id').delete(protect, isAdmin, deleteUser);


module.exports = router; 