import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/db-connect';
import Case from '@/db/models/case.model';
import User from '@/db/models/user.model';
import Organization from '@/db/models/organization.model';

/**
 * Handles DELETE requests to remove a document based on the specified model and ID.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @param {object} params - URL parameters containing the model and document ID.
 * @param {string} params.model - The model type ('case', 'user', 'organization').
 * @param {string} params.id - The unique identifier of the document to delete.
 * @returns {Promise<NextResponse>} A NextResponse object confirming deletion or an error message.
 */
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
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 204});
        case 'user':
          await User.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 204});
        case 'organization':
          await Organization.findByIdAndDelete(id);
          return NextResponse.json({message: `Document ${id} deleted.`}, {status: 204});
        default:
          return NextResponse.json({error: `No model specified.`}, {status: 400});
      }
    } catch (err) {
      return NextResponse.json({error: `Error deleting document ${id}.`}, {status: 500});
    }
}
