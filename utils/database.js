import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  // Mongo Connection //

  const url = process.env.MONGO_URL;

  await mongoose.connect(url, { dbName: process.env.MONGO_DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error);
    });


  // Mongo Connection //


}


