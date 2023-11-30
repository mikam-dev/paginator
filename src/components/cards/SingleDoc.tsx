import { Skeleton } from '../ui/skeleton'
import { CaseCard } from './model-cards/CaseCard'
import { UserCard } from './model-cards/UserCard'
import { OrgCard } from './model-cards/OrgCard'

interface SingleDocProps {
	model: string;
	data: any;
	onDelete: () => void;
}

export function SingleDoc({ model, data, onDelete }: SingleDocProps) {
	if (model === 'case') {
		return (
			<CaseCard onDelete={() => onDelete()} data={data} />
		)
	}
	if (model === 'user') {
		return (
			<UserCard onDelete={() => onDelete()} data={data} />
		)
	}
	if (model === 'organization') {
		return (
			<OrgCard onDelete={() => onDelete()} data={data} />
		)
	}
	else {
		return (
			<Skeleton />
		)
	}

}

export default SingleDoc