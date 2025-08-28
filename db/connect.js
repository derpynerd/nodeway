import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully'));
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectToDB;