// TODO: Create dynamic api route to delete a Case, User, or Organization item by id
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/db-connect';
import Case from '@/db/models/case.model';
import User from '@/db/models/user.model';
import Organization from '@/db/models/organization.model';

export async function DELETE(	
	request: NextRequest, 
	{ params }: { params: { 
			model: string,
			id: string 
		} 
	}){
    await dbConnect();
		const model = params.model
		const id = params.id

		try {
      switch (model) {
        case 'case':
          await Case.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`});
        case 'user':
          await User.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`});
        case 'organization':
          await Organization.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`});
        default:
          return NextResponse.json({error: `No model specified.`});
      }
    } catch (err) {
      console.log('ERROR', err);
    }
}
