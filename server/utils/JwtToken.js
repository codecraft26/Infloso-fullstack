const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken(); // Ensure method name matches

    // Options for cookie
    const options = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Adjust the expiration as needed
        httpOnly: true,
    };

    // Omit the password using destructuring and spread operator
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            user: userWithoutPassword,
            token,
        });
};

export default sendToken;
