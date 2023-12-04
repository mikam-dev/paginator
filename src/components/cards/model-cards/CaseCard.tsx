"use client"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDelete } from '../ConfirmDelete';

import { ICase } from '@/db/models/case.model';

interface CaseCardProps {
	data: ICase;
	onDelete: () => void;
}

/**
 * Card component for displaying information about a case.
 *
 * @param {Object} props - Component properties.
 * @param {ICase} props.data - The case data to display.
 * @param {Function} props.onDelete - Callback function for delete action.
 * @returns {React.Component} A card component displaying case details.
 */
export function CaseCard({ data, onDelete }: CaseCardProps) {
	const { _id, client, incident, recovery } = data;

	const incidentDate = new Date(incident?.date)
	const recoveryDate = new Date(recovery?.received)

	return (
		<Card className="bg-card flex flex-col justify-between">
			<CardHeader>
				<div className="flex flex-row w-full justify-between items-start">
					<CardTitle>{client?.given_name} {client?.family_name}</CardTitle>
					<Button variant="destructive" size="icon" className="w-4 h-4">
						<ConfirmDelete onDelete={() => onDelete()} model="case" id={_id} />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
				<CardDescription className="flex flex-col items-start justify-evenly">
					<div className="flex flex-col items-start justify-evenly mb-2">
						<p>{client?.email}</p>
						<p>{client?.phone}</p>
					</div>
					<div className="flex flex-col items-start justify-evenly">
						<p>{client?.address.line1}</p>
						<p>{client?.address.line2}</p>
						<p>{client?.address.city}, {client?.address.state}</p>
						<p>{client?.address.zip}</p>
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex flex-col flex-1 w-full px-2 h-fit max-h-[200px] overflow-auto justify-start items-start">
					<div className="flex flex-col items-start justify-evenly mb-1">
						<div className="flex justify-between items-center w-full mb-2">
							<h3 className="text-lg font-semibold">Incident</h3>
							<p>{incidentDate.toLocaleDateString()}</p>
						</div>
						<ul className="mb-2">
							<li>{incident?.address.line1}</li>
							<li>{incident?.address.line2}</li>
							<li>{incident?.address.city}, {incident?.address.state}</li>
							<li>{incident?.address.zip}</li>
						</ul>
						<p>{incident?.details}</p>
					</div>
					<div className="flex flex-col items-start justify-evenly mb-1">
						<h3 className="text-lg font-semibold mb-1">Recovery</h3>
						<p>Expected: {recovery?.expected}</p>
						<p>Actual: {recovery?.actual}</p>
						<p>Received: {recoveryDate.toLocaleDateString()}</p>
					</div>
				</ScrollArea>
			</CardContent>
			<CardFooter className="py-4">
				<Badge variant="default">Case</Badge>
			</CardFooter>
		</Card>
	)
}

export default CaseCard
