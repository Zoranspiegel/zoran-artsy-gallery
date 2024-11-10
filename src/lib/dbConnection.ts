import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';

const appDir = process.cwd();
loadEnvConfig(appDir);

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) return;

    if (!process.env.MONGODB_URI) throw new Error('Internal Server Error');

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
