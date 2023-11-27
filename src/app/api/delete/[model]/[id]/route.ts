// TODO: Create dynamic api route to delete a Case, User, or Organization item by id
import { NextRequest, NextResponse } from 'next/server';
import { SetModelType } from '@/lib/helpers';

export async function DELETE(	
	request: NextRequest, 
	{ params }: { params: { 
			model: string,
			id: string 
		} 
	}) {
		const model = params.model
		const id = params.id

		const Model = SetModelType(model);

		try {
			await Model?.findByIdAndDelete(id)
    } catch (err) {
      console.log('ERROR', err);
    }
}