const User = require('../models/User')


exports.getUser = (req, res, next) => {
    const { id } = req.user
    try {
        User.findOne({ _id: id }, function (err, user) {
            res.json(user);
        });

    } catch (error) {
        next(error)
    }


}

exports.getStudent = (req, res, next) => {
    try {
        User.find({ role: 'user' }, function (err, users) {
            res.json(users)
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllStudents = (req, res, next) => {
    try {
        User.find({ role: 'user' }, function (err, users) {
            res.json(users)
        })

    } catch (error) {
        next(error)
    }
}

exports.getTeacher = (req, res) => {
    

    const { id } = req.params

        User.findById({ _id: id }, function (err, user) {
            if (err) {
                return res.json({ success: false, data: "invalid user or id does not exist" })
            }
            res.json(user);
        })
    
}

exports.getAllTeachers = (req, res, next) => {
    try {
        User.find({ role: 'teacher' }, function (err, teachers) {
            res.json(teachers)
        })
    } catch (error) {
        next(error)
    }
}
