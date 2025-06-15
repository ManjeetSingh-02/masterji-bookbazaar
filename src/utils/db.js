// import local modules
import { envConfig } from './env.js';

// import external modules
import mongoose from 'mongoose';

// function to connect to the database
export async function connectToDB() {
  await mongoose
    .connect(envConfig.MONGODB_URI)
    .then(() => console.log('Connection to DataBase: ✅'))
    .catch(error => {
      throw new Error(`Connection to DataBase: ❌\n${error.message}`);
    });
}
