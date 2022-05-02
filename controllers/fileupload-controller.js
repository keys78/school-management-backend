const { fileSizeFormatter } = require("../utils/filehelper")
const SingleFile = require('../models/File');
const User = require('../models/User')

// exports.uploadFile = async (req, res, next) => {

//     try {
//         const file = new SingleFile({
//             fileName: req.file.originalname,
//             filePath: req.file.path,
//             fileType: req.file.mimetype,
//             fileSize: fileSizeFormatter(req.file.size, 2),
//             user: req.params.id
//         });
//         console.log(file)
//         await file.save();
//         res.status(201).send('File Uploaded Successfully');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

exports.uploadFile = async (req, res, next) => {

    const user = await User.findById(req.params.id);
    const url = req.protocol + '://' + req.get('host') + '/'


    if (user) {
        user.pic = `uploads/${req.file.filename}`
        const updatedUser = await user.save();

        res.json({
              pic: updatedUser.pic,

        });

    } else {
        res.status(404);
        // throw new Error("User Not Found");
        res.json({data: 'user not founf'})
    }

 
};


// exports.uploadFile = (req, res, next) => {

//     User.findById( { _id: req.params.id })
//         .exec()
//         .then(user => {
//             const file = new SingleFile({
//                 fileName: req.file.originalname,
//                 filePath: req.file.path,
//                 fileType: req.file.mimetype,
//                 fileSize: fileSizeFormatter(req.file.size, 2),
//                 user: req.params.id
//             });
//             console.log(file)
//             file.save()
//                 .then(profileImg => {
//                     console.log(profileImg._id);
//                     l = user.profileImg.push(profileImg._id);

//                     user.save()
//                         .then((user) => res.status(200).json(user))
//                         .catch(err => res.status(400).json('Error on user save: ' + err));
//                 }
//                 )
//                 .catch(err => res.status(400).json('Error on profile Image save: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// }

// exports.registerCourse = (req, res) => {
//     User.findById(
//         { _id: req.params.id })
//         .exec()
//         .then(user => {
//             const course = new Course({
//                 code: req.body.code,
//                 title: req.body.title,
//                 score: req.body.score,
//                 units: req.body.units,
//                 status: req.body.status,
//                 user: req.params.id
//             });
//             course.save()
//                 .then(course => {
//                     console.log(course._id);
//                     l = user.courses.push(course._id);

//                     user.save()
//                         .then((user) => res.status(200).json(user))
//                         .catch(err => res.status(400).json('Error on user save: ' + err));
//                 }
//                 )
//                 .catch(err => res.status(400).json('Error on course save: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// };



















// exports.singleFileUpload = async (req, res, next) => {
//     try {
//         const file = req.file;
//         console.log(file)
//         res.status(201).send('Image Uploaded Successfully')
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }



