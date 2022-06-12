import mongoose from 'mongoose'

const url = process.env.MONGODB_URL || process.env.MONGODBATLAS_URL;
const connectMongo = async () => {
    try {
        await mongoose.connect(url);
      } catch (error) {
        console.log(error.message);
      }
}


export default connectMongo 