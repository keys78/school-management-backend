const express = require("express");
const router = express.Router();
const { registerCourse, updateScore, getAllUserForACourse  } = require("../controllers/course-controller");
const { uploadFile } = require("../controllers/fileupload-controller");
const { getUser, getStudent, getAllStudents, getTeacher, getAllTeachers, updateProfile, deleteUser, getStudentLecturers, } = require('../controllers/private');
const { protect, isAdmin, isTeacherAndAdmin } = require('../middlewares/authProtect');
const { upload } = require("../utils/filehelper")



// user routes
router.route('/user').get(protect, getUser);
router.route('/profile').post(protect, updateProfile);
router.post('/upload-photo/:id', upload.single('file'), (uploadFile))



router.route('/register-course/:id').post(protect, registerCourse) //userId
router.route('/update-score/:id').put(protect, isTeacherAndAdmin, updateScore) //courseId
router.route('/students').get(protect, isTeacherAndAdmin, getAllStudents);
router.route('/getcourse').get(getAllUserForACourse)
router.route('/get-teacher-info').get(protect, getStudentLecturers)

// admin routes
router.route('/admin').get(protect, isAdmin, getUser);
router.route('/admin/user/:id').get(protect, isAdmin, getStudent);
router.route('/admin/teacher/:id').get(protect, isAdmin, getTeacher);
router.route('/admin/teachers').get(protect, isTeacherAndAdmin, getAllTeachers);
router.route('/admin/delete-user/:id').delete(protect, isAdmin, deleteUser);

module.exports = router;