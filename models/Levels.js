const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    faculty: { type: String },
    departments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})


const DepartmentSchema = new mongoose.Schema({
    department: { type: String },
    courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})


const CourseSchema = new mongoose.Schema({
    subject: { type: String },
    score: { type: Number },
    user: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


const Faculty = mongoose.model("Faculty", FacultySchema)
const Department = mongoose.model("Department", DepartmentSchema)
const Course = mongoose.model("Course", CourseSchema)



module.exports = {
    Faculty,
    Department,
    Course
}