# MelodyVerse Backend

This is the backend API for **MelodyVerse**, a music streaming platform. This backend handles user authentication, registration, and other related features. It's built with **Node.js** and **Express.js** and uses **JWT** for secure authentication.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/get-npm) (or [yarn](https://yarnpkg.com/))
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/codecraft26/-Infloso-fullstack.git
   cd server
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env\` file and set the following environment variables:

   \`\`\`
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

   The server should now be running at \`http://localhost:5000\`.

## API Endpoints

### Auth Routes

| Route            | Method | Description                      | Auth Required |
| ---------------- | ------ | -------------------------------- | ------------- |
| \`/api/v1/register\` | POST   | Register a new user              | No            |
| \`/api/v1/login\`  | POST   | User login (JWT token returned)  | No            |
| \`/api/v1/forgot-password\` | POST | Send password reset link | No            |
| \`/api/v1/reset-password/:token\` | POST | Reset password using token | No |
| \`/api/v1/refresh-token\` | POST | Refresh JWT token | Yes |



### Error Handling

All endpoints return errors in the following structure:

\`\`\`json
{
  "error": "Error message"
}
\`\`\`

### Response Format

Successful responses will have the following structure:

\`\`\`json
{
  "success": true,
  "data": { ... }
}
\`\`\`

### Authentication

This API uses **JWT** for authentication. Include the JWT in the \`Authorization\` header for routes that require authentication:

\`\`\`
Authorization: Bearer <token>
\`\`\`


## Running Tests

To run tests (if applicable):

\`\`\`bash
npm test
\`\`\`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
"""
