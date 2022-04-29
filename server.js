require('dotenv').config({ path: "./config.env" });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error')
const cors = require('cors')

const path = require('path')

// Connect DB
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to e-school backend api 💁👌🎍😍')
  })

// authentication routes
app.use('/auth', require('./routes/auth'));

// user routes
app.use('/private', require('./routes/private'));



// app.use('api', fileRoutes.)
// Error Handler ( Should be last piece of middleware)
app.use(errorHandler);


const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on("unhandledRejections", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});