import { NextResponse } from 'next/server';
import dbConnection from '@/db/db-connect';
 
export async function GET() {
  const db = await dbConnection();

  if (db) {
    console.log(`Connected to mongo db using connection string: ${process.env.MONGODB_URI?.split('@')[1]}`)
  } else {
    console.log('FAILED TO CONNECT TO DB');
  }

  return NextResponse.json({ connectedToDb: !!db })
}