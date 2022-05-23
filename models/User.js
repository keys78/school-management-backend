const crypto = require("crypto")
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "student",
        enum: ["student", "teacher", "admin"]
    },

    level: {
        type: String,
        default: '100'
    },

    firstName: { type: String, required: [true, "Please provide firstName"], trim: true },
    lastName: { type: String, required: [true, "Please provide lastName"], trim: true },
    gender: { type: String },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    phone: { type: String },
    address: { type: String },
    dob: { type: String },
    soo: { type: String },


    profileImg: {
        type: String,

    },
    pic: {
        type: String,
        // default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        default: 'https://res.cloudinary.com/dzqeok9jl/image/upload/v1653304270/e-school/user-default_ndnxey.jpg'
    },

    courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],

    department: { type: String },
    faculty: { type: String },

    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},
    { timestamps: true });




UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken;
};

const User = mongoose.model("User", UserSchema)

module.exports = User