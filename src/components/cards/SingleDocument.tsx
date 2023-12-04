import { Skeleton } from '../ui/skeleton';
import { CaseCard } from './model-cards/CaseCard'
import { OrganizationCard } from './model-cards/OrganizationCard'
import { UserCard } from './model-cards/UserCard'

interface SingleDocumentProps {
	model: string;
	data: any;
	onDelete: () => void;
}

/**
 * Renders a document card based on the specified model type.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.model - The model type ('case', 'user', 'organization').
 * @param {Object} props.data - The data for the document.
 * @param {Function} props.onDelete - Callback function to execute on delete action.
 * @returns {React.Component} A document card component corresponding to the model type.
 */
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
	return (
		<Skeleton />
	)
}

export default SingleDocument