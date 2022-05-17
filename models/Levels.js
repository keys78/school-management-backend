const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    faculty: { type: String },
    departments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})


const DepartmentSchema = new mongoose.Schema({
    department: { required: true, type: String },
    courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})


const CourseSchema = new mongoose.Schema({
    code: { type: String, required: true, },
    title: { type: String, required: true, },
    score: { type: Number, required: true, },
    gradepoint: { type: Number, required: true, },
    letterGrade: { type: String, required: true, },
    units: { type: Number, required: true, },
    qualitypoint: { type: Number, required: true, },
    status: { type: Boolean, default: false },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const Faculty = mongoose.model("Faculty", FacultySchema)
const Department = mongoose.model("Department", DepartmentSchema)
const Course = mongoose.model("Course", CourseSchema)



module.exports = {
    Faculty,
    Department,
    Course
}