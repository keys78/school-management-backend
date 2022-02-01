const  { Course } = require('../models/Levels')
const  User = require('../models/User')

// exports.registerCourse = (req, res) => {
//     var courseObj = {
//         "subject": req.body.subject,
//         "score": req.body.score
//     }
//     var newCourse = new Course(courseObj)
//     newCourse.save((err, course) => {
//         err &&  res.status(400).send(err)
//         res.status(200).json(course)
//     })
// };
exports.registerCourse = async (req, res, next) => {
    // const { subject, score } = req.body
    // const course = new Course()
    // course.id = req.body.id;
    // course.subject = req.body.subject;
    // course.score = req.body.score;
    // course.save()
    //   .then((result) => {
    //     User.findOne({ course: course.id }, (err, user) => {
    //         if (user) {
    //             // The below two lines will add the newly saved course's 
    //             // ObjectID to the the User's courses array field
    //             user.courses.push(course);
    //             user.save();
    //             res.json(course);
    //         }
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({ error });
    //   });
        const { id } = req.params
      try {
        // const course = await Course.create({
        //    "subject": subject,
        //    "score": score,
        //     "user": id
        // });

        const newCourse = new Course({
            subjectv: req.body.subject,
            score: req.body.score,
            user: '61f966c9900345ab81789391'
         })

         newCourse.save()

        res.json({ success: true, data: newCourse})

    } catch ( error) {
        next(error);
    }
};


exports.viewCourses = (req, res) => {
    // const { id } = req.user
  
    Course.find({}).populate('user').exec((err, course) => {
        if(err) {
            res.status(400).send(err)
        } else {
            res.status(300).json(course)
        }
    })
}

