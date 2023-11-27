// TODO: Create dynamic api route to retrieve Case, User, or Organization items
import { NextResponse } from 'next/server';
import { SetModelType } from '@/lib/helpers';
// import Model Types
import User from '@/db/models/user.model';
import Case from '@/db/models/case.model';
import Organization from '@/db/models/organization.model';

export async function GET(
  request: Request,
  { params }: { params: { model: string } }
  ) {
    const model = params.model;

    const Model = SetModelType(model);

    try {
      const data = await User.find().limit(10);
      console.log('DATA', data);
      return NextResponse.json(data, { status: 200});
    } catch (err) {
      console.log('ERROR', err);
      return NextResponse.json({ error: 'Error fetching data' });
    }
}