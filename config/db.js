const mongoose = require('mongoose');

const connectDB  = () => {
        mongoose.connect('mongodb+srv://Emmanuel:todo12345@mernapp.2kina.mongodb.net/todoapp?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnfiedTopology: true,
        // useFindAndModified:true
    });

    console.log('MongoDB connected')
};

module.exports = connectDB;