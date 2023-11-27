import User from '@/db/models/user.model';
import Case from '@/db/models/case.model';
import Organization from '@/db/models/organization.model';

export const SetModelType = (model: string) => {
	let Model: typeof User | typeof Case | typeof Organization;
	switch (model) {
		case 'user':
			Model = User;
			break;
		case 'case':
			Model = Case;
			break;
		case 'organization':
			Model = Organization;
			break;
		default:
			Model = Case;
			break;
	}
	return Model;
}