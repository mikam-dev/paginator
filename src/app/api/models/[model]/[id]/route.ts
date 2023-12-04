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
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 200});
        case 'user':
          await User.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 200});
        case 'organization':
          await Organization.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 200});
        default:
          return NextResponse.json({error: `No model specified.`}, {status: 400});
      }
    } catch (err) {
      console.log('ERROR', err, {status: 500});
    }
}
