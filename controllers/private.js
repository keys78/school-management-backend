const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const multer = require('multer')
const DIR = './public';


// User.findOne({ username: req.params.username })//       .populate('reviews')//       .then((result) => {//         res.json(result);//       })//       .catch((error) => {//         res.status(500).json({ error });//       });

exports.getUser = async (req, res,) => {
    const { id } = req.user
  
       await User.findOne({ _id: id }).populate({ path: 'courses', select: 'subject score -_id', }).exec((err, user) => {
            if(err) {
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
        User.find({ role: 'user' }, function (err, users) {
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

exports.updateProfile = async (req, res, next) => {

    const user = await User.findById(req.user._id);
    // const url = req.protocol + '://' + req.get('host')

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    // user.profileImg = user.profileImg

    const updatedUser = await user.save();

    res.json({
    //   _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    //   profileImg: updatedUser.profileImg

    });

  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
        

};



// router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
exports.uploadImage = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({

        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
                result
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
};












































exports.deleteUser = async (req, res, next) => {
    User.findOneAndRemove({_id: req.params.id}, (err) => {
        if (err) {
          console.log('failed to delete user successfully')
          res.json({ success: false, data: 'failed to delete user'})
        }
    
        res.json({ success: true, data: 'account has been deleted'})
      });
}