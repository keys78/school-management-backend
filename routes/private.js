const express = require("express");
const router = express.Router();
const { registerCourse, updateScore, getAllUserForACourse } = require("../controllers/course-controller");
const { getUser, getStudent, getAllStudents, getTeacher, getAllTeachers, updateProfile, deleteUser, getStudentLecturers, activateStatus, inActivateStatus } = require('../controllers/private');
const { protect, isAdmin, isTeacherAndAdmin } = require('../middlewares/authProtect');
// const { uploadFile } = require("../controllers/fileupload-controller");
// const { upload } = require("../utils/filehelper")


const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('../controllers/aws-profile-upload')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const User = require('../models/User')



// user routes
router.route('/user').get(protect, getUser);
router.route('/profile').post(protect, updateProfile);
// router.post('/upload-photo/:id', upload.single('file'), (uploadFile))


router.post('/upload-photo/:id', upload.single('profileImage'), protect, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const file = req.file

    try {
        const result = await uploadFile(file)
        user.pic = result.Location
        await user.save();
        await unlinkFile(file.path)

        res.send({ status: 'image uploaded successfully!', data: result.Location })


    } catch (error) {
        await unlinkFile(file.path)
        next(error)
    }
})

router.route('/activeStatus').post(protect, activateStatus)
router.route('/inactiveStatus').post(protect, inActivateStatus)


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