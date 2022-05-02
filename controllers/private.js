const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// User.findOne({ username: req.params.username })//       .populate('reviews')//       .then((result) => {//         res.json(result);//       })//       .catch((error) => {//         res.status(500).json({ error });//       });

exports.getUser = async (req, res,) => {
    const { id } = req.user

    await User.findOne({ _id: id }).populate({ path: 'courses', select: 'code title score units score status -_id', }).exec((err, user) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(user)
        }
    })
    // User.findOne({_id : id }, function(err,user){
    //     if(err) {
    //                     res.status(400).send(err)
    //                 } else {
    //                     res.status(200).json(user)
    //                 }
    // });
};
// exports.getUser = (req, res,) => {
//         const { id } = req.user  
//             User.findOne({ _id: id }).populate('courses', { subject: 1, score: 1, _id: - 1}).exec((err, user) => {
//                     if(err) {
//                             res.status(400).send(err)
//                         } else {
//                                 res.status(200).json(user)
//                             }
//                         })
//                 };

// exports.getUser = (req, res, next) => {//     const { id } = req.user//     try {//         User.findOne({ _id: id }, function (err, user) {//             res.json(user);//         });//     } catch (error) {//         next(error)//     }// };

exports.getStudent = (req, res, next) => {
    const { id } = req.params

    User.find({ _id: id, role: "user" }, function (err, user) {
        if (err) {
            return next(new ErrorResponse("Invalid student or ID  not found", 404));
        }
        res.json(user);
    })

};
exports.getAllStudents = (req, res, next) => {

    try {
        User.find({ role: 'student' }).populate({ path: 'courses', select: 'code title score units score status _id', }).exec((err, users) => {
            if (err) {
                return res.json({ success: false, data: "something went wrong" })
            }
            res.json(users)
        })

    } catch (error) {
        next(error)
    }
};
exports.getTeacher = (req, res) => {

    const { id } = req.params

    User.findById({ _id: id, role: "teacher" }, function (err, user) {
        if (err) {
            return next(new ErrorResponse("Invalid teacher or ID  not found", 404));
        }
        res.json(user);
    })

};
exports.getAllTeachers = (req, res, next) => {
    try {
        User.find({ role: 'teacher' }, function (err, teachers) {
            if (err) {
                return res.json({ success: false, data: "something went wrong" })
            }
            res.json(teachers)
        })
    } catch (error) {
        next(error)
    }
};
exports.updateProfile = async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.dob = req.body.dob || user.dob;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.soo = req.body.soo || user.soo;

        const updatedUser = await user.save();

        res.json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            dob: updatedUser.dob,
            phone: updatedUser.phone,
            address: updatedUser.address,
            soo: updatedUser.soo,
        });

    } else {
        res.status(404);
        throw new Error("User Not Found");
    }


};
exports.deleteUser = async (req, res, next) => {
    User.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
            console.log('failed to delete user successfully')
            res.json({ success: false, data: 'failed to delete user' })
        }

        res.json({ success: true, data: 'account has been deleted' })
    });
}