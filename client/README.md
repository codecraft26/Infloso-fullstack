
# MelodyVerse Authentication Screens

This project includes **Login** and **Signup** screens for the **MelodyVerse** application. These screens are designed to handle user authentication with basic validation, error handling, and state management in React. The design is responsive and visually consistent with the MelodyVerse theme.

## Features

### Login Screen

- **Username/Email and Password Fields:** Users can log in using either their username or email.
- **Basic Validation:** Ensures fields are not empty and validates password strength.
- **Clear Error Messages:** Displays helpful messages for invalid inputs.
- **Forgot Password:** A placeholder link for password recovery.
- **Remember Me:** Implements the "Remember Me" functionality using local storage.
- **Redirection:** After successful login, users are redirected to the homepage.

### Signup Screen

- **Username/Email, Password, Name, and Profile Picture Fields:** Users can sign up by providing their details.
- **Password Confirmation:** Ensures passwords match before submission.
- **Validation:** Validates required fields and checks for correct email format.
- **Terms and Conditions:** Includes a checkbox to agree to the terms and conditions.
- **Clear Messages:** Displays clear error messages for invalid input and a success message on successful signup.
- **Simulated Email Notification:** Simulates sending a welcome email upon signup (no actual email service).
- **Redirection:** After successful signup, users are redirected to the login screen.

### General Requirements

- **Responsive Design:** The screens are designed using **Tailwind CSS** to ensure compatibility across various screen sizes.
- **MelodyVerse Theme:** The screens follow the MelodyVerse theme to maintain a consistent look and feel (using custom CSS interpretation).
  
## Tech Stack

- **React:** Core framework for building the user interface.
- **React Router:** For managing redirection and routing between the login, signup, and homepage.
- **React-Toastify:** For displaying notifications.
- **Vanilla CSS:**
- **Local Storage:** Used for the "Remember Me" functionality.

## Installation and Setup

1. Clone the repository:
   \`\`\`bash
  git clone https://github.com/codecraft26/-Infloso-fullstack.git
   cd client
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the application:
   \`\`\`bash
   npm start
   \`\`\`

4. Open the app in your browser at \`http://localhost:3000\`.
