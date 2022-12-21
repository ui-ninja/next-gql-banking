import mongoose from 'mongoose';

const MONGODB = process.env.MONGOOSE_URL;

export const connectDb = () => {
  try {
    if (MONGODB) {
      mongoose.connect(MONGODB).then(() => {
        console.log('Database connected');
      });
    }
  } catch (error) {
    console.log('error connecting to database');
    console.error(error);
    process.exit(1);
  }
};
