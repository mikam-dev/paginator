import { NextResponse } from 'next/server';
import dbConnection from '../../../db/db-connect';
import User from '@/db/models/user.model';
 
export async function GET() {
  const db = await dbConnection();

  if (db) {
    console.log(`Connected to mongo db using connection string: ${process.env.MONGODB_URI?.split('@')[1]}`)
  } else {
    console.log('FAILED TO CONNECT TO DB');
  }

  try {
  await User.create({
    info: {
      given_name: 'Test',
      family_name: 'User',
      email: 'test@email.com',
      phone: '333-456-4535',
      dob: new Date(),
    },
    assets: {
      avatar_url: '/next.svg',
    }
  });
  } catch (err) {
    console.log('ERROR', err);
  }
  return NextResponse.json({ connectedToDb: !!db })
}