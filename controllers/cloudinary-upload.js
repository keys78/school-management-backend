


exports.cloudinaryUpload = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'e-school',
        });
        console.log(uploadResponse);
        res.json({ msg: 'File uploaded sucessfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
};