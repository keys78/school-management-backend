const { Course, Department, Faculty } = require('../models/Levels')
const User = require('../models/User')

exports.registerCourse = (req, res) => {
    // const code = (req.body.code);
    // const title = (req.body.title);
    // const score = (req.body.score);
    // const units = (req.body.units);
    User.findById(
        { _id: req.params.id })
        .exec()
        .then(user => {
            const course = new Course({
                code: req.body.code,
                title: req.body.title,
                score: req.body.score,
                units: req.body.units,
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

    let scoreObj = { score: req.body.score }

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
    const department =  req.body.department

    const myDepartment = new Department({
        department,
        user: req.params.id
    });

    myDepartment.save((err, dept) => {
        if(err) {
            res.json({ data: "unable to create department"})
        } else {
            res.json({ success: true, data: dept })
        }
    })
}

exports.getAllUserForACourse = (req, res) => {
    User.find({ courses: ['code']})
        .exec((err, course) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).json(course);
            }
    })
}
