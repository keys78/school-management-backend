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
    // const url = req.protocol + '://' + req.get('host') + '/'


    if (user) {
        user.pic = `uploads/${req.file.filename}`
        const updatedUser = await user.save();

        res.json({
              pic: updatedUser.pic,
        });

    } else {
        res.status(404);
        // throw new Error("User Not Found");
        res.json({data: 'user not found'})
    } 
};