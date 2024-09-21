import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aman:aman@cluster0.upajlbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Initiate connection
connectDB();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});
