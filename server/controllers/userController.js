import User from '../models/userModel.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import sendToken from '../utils/JwtToken.js';
import ErrorHander from '../utils/errorhander.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js'; 

export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
        // Create new user
        const user = await User.create({ userName, email, password });

        // Generate verification token
        const verificationToken = user.getVerificationToken();
        await user.save({ validateBeforeSave: false });

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/verify-email/${verificationToken}`;

        const message = `Hello ${userName},\n\nPlease verify your email by clicking on the following link:\n\n${verificationUrl}\n\nThank you!`;

        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message,
        });

        res.status(201).json({
            success: true,
            message: `Account created successfully. Verification email sent to: ${user.email}`,
        });
    } catch (err) {
        return next(new ErrorHander(err.message, 500));
    }
});
// Login User
// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user has provided both email and password
    if (!email || !password) {
        return next(new ErrorHander('Please Enter Email & Password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHander('User not found', 404));
    }

    // Check if the user is verified
    if (!user.isVerified) {
        return next(new ErrorHander('Please verify your email before logging in', 403));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Incorrect password', 401));
    }

    sendToken(user, 200, res);
});


// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
});


// Verify Email
export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
    const verificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        verificationToken,
        verificationExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander('Verification token is invalid or has expired', 400));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Email verified successfully',
    });
});


// Request Password Reset
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHander('User not found', 404));
    }

    const resetToken = user.getResetPasswordToken();
    console.log(resetToken);
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you did not request this email, please ignore it.`;

    try {
     
        //send email to the user for password reset
        await sendEmail({
            email: user.email,
            subject: 'Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander('Email could not be sent', 500));
    }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander('Reset token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

export const resendVerificationEmail = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHander('User not found', 404));
    }

    // Check if the user is already verified
    if (user.isVerified) {
        return next(new ErrorHander('User is already verified', 400));
    }

    // Generate a new verification token
    const verificationToken = user.getNewVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/verify-email/${verificationToken}`;

    const message = `Hello ${user.userName},\n\nPlease verify your email by clicking on the following link:\n\n${verificationUrl}\n\nThank you!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Verification email sent to: ${user.email}`,
        });
    } catch (error) {
        user.verificationToken = undefined;
        user.verificationExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander('Email could not be sent', 500));
    }
});
