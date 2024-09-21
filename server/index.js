import app from './app.js';
import {connectDB} from './db/db.js';
import dotenv from 'dotenv';

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "./config.env" });
}

// Connect to database
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});



// Route
app.get('/', (req, res) => {
    res.send("server is running");
});
