const mongoose = require('mongoose');

const connectDB  = () => {
        // mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
        mongoose.connect('mongodb+srv://Emmanuel:todo12345@mernapp.2kina.mongodb.net/e-school', {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnfiedTopology: true,
        // useFindAndModified:true
    });

    console.log('MongoDB connected')
};

module.exports = connectDB;