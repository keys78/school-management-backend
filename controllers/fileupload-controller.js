const { fileSizeFormatter } = require("../utils/filehelper")
const SingleFile = require('../models/File');

exports.uploadFile = async (req, res, next) => {

    try {
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),

        });
        console.log(file)
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


exports.getProfileImage = async (req, res, next) => {
    try {
        const files = await SingleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




















// exports.singleFileUpload = async (req, res, next) => {
//     try {
//         const file = req.file;
//         console.log(file)
//         res.status(201).send('Image Uploaded Successfully')
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }



