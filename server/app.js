import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import errorMiddleware from './middleware/error.js';

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  import('dotenv').then((dotenv) => dotenv.config({ path: '../config.env' }));
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports

import user from './routes/userRoutes.js';



app.use('/api/v1', user);


// Middleware for Errors
app.use(errorMiddleware);

export default app;
