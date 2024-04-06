import mongoose from 'mongoose';

const connectDB = async () => {
  
  try {
    const url = process.env.DB_LOCATION || "";
    
    const con = await mongoose.connect(url);

    console.log(`Connected to MongoDB Database ${con.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

export default connectDB;