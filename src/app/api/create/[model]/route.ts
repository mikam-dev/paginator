// TODO: Create dynamic api route to create a Case, User, or Organization item
import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/db/db-connect';

export async function POST(
	request: NextRequest, 
	{ params }: { params: { model: string } }) {
		const model = params.model
		const db = await dbConnection();
		const formData = await request.formData()

    if (db) {
      console.log(`Connected to mongo db using connection string: ${process.env.MONGODB_URI?.split('@')[1]}`)
    } else {
      console.log('FAILED TO CONNECT TO DB');
    }

		try {
    
    } catch (err) {
      console.log('ERROR', err);
    }
    return NextResponse.json({ connectedToDb: !!db })
}