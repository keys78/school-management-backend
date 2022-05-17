const   multer = require('multer')
const DIR = '../client/public/uploads';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
  })


exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


exports.fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}






































































// // 'use strict'
// // const multer = require('multer')

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, '.uploads')
// //     },
// //     filename: function (req, res, cb) {
// //         cb(null, new Date.now().toISOString().replace(/:/g, '-')+ '-' + file.originalname)
// //     }
// // })

// // const filefilter = (req, file, cb) => {
// //     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
// //         cb(null, true)
// //     } else {
// //         cb(null, false)
// //     }
// // }



// // const upload = multer({ storage: storage, fileFilter: filefilter})

// // module.exports = (upload)



// let express = require('express')
//  const   multer = require('multer')
//  const   mongoose = require('mongoose')
//  const   router = express.Router()
// const DIR = './public/';


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, DIR)
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })


// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// // User model
// let User = require('../models/User');
// router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         profileImg: url + '/public/' + req.file.filename
//     });
//     user.save().then(result => {
//         res.status(201).json({
//                 profileImg: result.profileImg
//         })
//     }).catch(err => {
//         console.log(err),
//             res.status(500).json({
//                 error: err
//             });
//     })
// })
// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });
// module.exports = router;


