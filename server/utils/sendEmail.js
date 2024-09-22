import nodemailer from 'nodemailer';
import '../config/config.js'

const sendEmail = async ({ email, subject, message }) => {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, // Using environment variable for email
                pass: process.env.EMAIL_PASS, // Using environment variable for password or app-specific password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Email address sending the mail (can also be hardcoded if not needed)
            to: email, // Recipient's email
            subject: subject, // Subject of the email
            text: message, // Plain text message
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
