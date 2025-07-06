import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('movie_explorer');
  return { db, client };
}

export async function registerUser(email: string, password: string) {
  const { db } = await connectToDatabase();
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) throw new Error('User already exists');
  const hashedPassword = await hash(password, 10);
  await db.collection('users').insertOne({ email, password: hashedPassword });
}