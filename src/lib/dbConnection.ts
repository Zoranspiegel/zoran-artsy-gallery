import env from '@/env';
import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) return;

  const db = await mongoose.connect(env.MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
