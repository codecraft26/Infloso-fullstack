
import mongoose from 'mongoose';
import '../config/config.js'

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {

      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Initiate connectio
connectDB();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});
