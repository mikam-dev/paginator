import { Skeleton } from '../ui/skeleton'
import { CaseCard } from './model-cards/CaseCard'
import { OrganizationCard } from './model-cards/OrganizationCard'
import { UserCard } from './model-cards/UserCard'

interface SingleDocumentProps {
	model: string;
	data: any;
	onDelete: () => void;
}

export function SingleDocument({ model, data, onDelete }: SingleDocumentProps) {
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
			<OrganizationCard onDelete={() => onDelete()} data={data} />
		)
	}
}

export default SingleDocument