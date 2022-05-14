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

        <section style="width: 100%; height:100vh; background: #ECECEC;">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div style="max-width: 450px; margin:0 auto; background: #fff; color:#000; padding:10px 20px 0px 20px; border-radius: 5px;">
            <h1 style="font-size: 32px; font-weight: bold;">Password Reset Request</h1>
            <hr/>
            <p style="font-size: 17px;">
                You are receiving this because you (or someone else) have requested the reset of the password for your account, 
               <br style="margin:0 0 10px 0"/>
               <br>

                If you did not request this, please ignore this email and your password will remain unchanged.

                <button style="width: 100%; padding:10px 0; color: #fff; background:#002147; margin-top: 15px;">
                    <a style="color: #fff; font-size: 18px; text-decoration: none; " href=${resetUrl} clicktracking=off>Click to Reset Password </a>
                </button>

                <p style="text-align: center; padding-top: 17px; padding-bottom:15px; font-size: 12px;">All Rights Reserved. e-school@2022 &#127891;</p>
        </div>
    </section>
        `


        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({ success: true, data: `Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.` });
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
            resetPasswordExpire: { $gt: Date.now() },
        });


        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: user.getSignedToken(),

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
    res.status(statusCode).json({ success: true, data: user.firstName, token })
}