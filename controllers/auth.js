const crypto = require("crypto")
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const bcrypt = require("bcryptjs")


exports.register = async (userDetails, role, res, next) => {
    try {
        const user = await User.create({
            ...userDetails, role
        });

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }



        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }

        sendToken(user, 200, res);
    } catch (error) {
        next(error)
    }
};

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("Email could not not be sent / account does not exist", 404))
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>

        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({ success: true, data: " If we found an account associated with that email, we've sent password reset instructions to the primary email address on the account." });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500))
        }

    } catch (error) {
        next(error);
    }
};

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
    } catch (error) {
        next(error);
    }
};


exports.changepassword = async (req, res, next) => {
    const { newPassword, password } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById({ _id: id }).select('+password');

        if (!user) {
            return next(new ErrorResponse("User not found", 400))
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Please enter correct old password", 400))
        }
        user.password = await newPassword
        await user.save();

        return res.json({ data: 'password update was successful' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong. Try again');
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, data:user.firstName, token })
}