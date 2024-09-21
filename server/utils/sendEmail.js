import nodemailer from 'nodemailer';

const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other services
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
