const { Course, Department, Faculty } = require('../models/Levels')
const User = require('../models/User')

exports.registerCourse = (req, res) => {
    User.findById(
        { _id: req.params.id })
        .exec()
        .then(user => {
            const course = new Course({
                code: req.body.code,
                title: req.body.title,
                score: req.body.score,
                units: req.body.units,
                gradepoint: 0,
                qualitypoint: 0,
                letterGrade: 'F',
                status: req.body.status,
                user: req.params.id
            });
            course.save()
                .then(course => {
                    console.log(course._id);
                    l = user.courses.push(course._id);

                    user.save()
                        .then((user) => res.status(200).json(user))
                        .catch(err => res.status(400).json('Error on user save: ' + err));
                }
                )
                .catch(err => res.status(400).json('Error on course save: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateScore = (req, res) => {
    function gradepointsPerCourse() {
        if (req.body.score >= 70) {
            return 5;
        } else if (req.body.score >= 60 && req.body.score <= 69) {
            return 4;
        } else if (req.body.score >= 50 && req.body.score <= 59) {
            return 3;
        } else if (req.body.score >= 45 && req.body.score <= 49) {
            return 2;
        } else if (req.body.score >= 40 && req.body.score <= 44) {
            return 1;
        } else {
            return 0;
        }
    }

    function letterGrade() {
        if (req.body.score >= 70) {
            return 'A';
        } else if (req.body.score >= 60 && req.body.score <= 69) {
            return 'B';
        } else if (req.body.score >= 50 && req.body.score <= 59) {
            return 'C';
        } else if (req.body.score >= 45 && req.body.score <= 49) {
            return 'D';
        } else if (req.body.score >= 40 && req.body.score <= 44) {
            return 'E';
        } else {
            return 'F';
        }
    }

    function qualitypointPerCourse() {
        const qp = req.body.units * gradepointsPerCourse()
        return qp
    }


    let scoreObj = { score: req.body.score, gradepoint: gradepointsPerCourse(), qualitypoint: qualitypointPerCourse(), letterGrade: letterGrade() }

    Course.findByIdAndUpdate(req.params.id, scoreObj, { new: true })
        .exec((err, course) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).json(course);
            }
        })

}

exports.selectDepartment = (req, res) => {
    const department = req.body.department

    const myDepartment = new Department({
        department,
        user: req.params.id
    });

    myDepartment.save((err, dept) => {
        if (err) {
            res.json({ data: "unable to create department" })
        } else {
            res.json({ success: true, data: dept })
        }
    })
}

exports.getAllUserForACourse = (req, res) => {
    User.find({ courses: ['code'] })
        .exec((err, course) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).json(course);
            }
        })
}
