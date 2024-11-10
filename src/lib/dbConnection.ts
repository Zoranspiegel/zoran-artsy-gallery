import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) return;

    if (!process.env.NEXT_PUBLIC_MONGODB_URI) throw new Error('Internal Server Error');

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
