import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import '../config/config.js'

const userSchema = new mongoose.Schema({
    userName: { type: String, required: [true, 'Please enter your name'], unique: true },
    email: { type: String, required: [true, 'Please enter your email'], unique: true },
    password: { type: String, required: [true, 'Please enter your password'], minlength: [6, 'Minimum password length is 6 characters'] },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpire: Date,
});

// Hashing the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 100000 });
};

// Method to generate verification token
userSchema.methods.getVerificationToken = function () {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.verificationExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes
    return verificationToken;
};

// forgot password token
userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    return resetToken;
};


// In your userModel.js
userSchema.methods.getNewVerificationToken = function () {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.verificationExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes
    return verificationToken;
};


// Exporting the model
export default mongoose.model('User', userSchema);
