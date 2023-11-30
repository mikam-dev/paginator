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
import { ConfirmDelete } from '../ConfirmDelete';

import { ICase } from '@/db/models/case.model';

interface CaseCardProps {
	data: ICase;
	onDelete: () => void;
}

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
					<p>{client?.email}</p>
					<p>{client?.phone}</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col flex-1 h-fit max-h-[200px] overflow-auto justify-start items-start">
				<div className="flex flex-col items-start justify-evenly mb-1">
					<h3 className="text-lg font-semibold mb-1">Incident</h3>
					<p>Date: {incidentDate.toLocaleDateString()}</p>
					<p>{incident?.details}</p>
				</div>
				<div className="flex flex-col items-start justify-evenly mb-1">
					<h3 className="text-lg font-semibold mb-1">Recovery</h3>
					<p>Expected: {recovery?.expected}</p>
					<p>Actual: {recovery?.actual}</p>
					<p>Received: {recoveryDate.toLocaleDateString()}</p>
				</div>
			</CardContent>
			<CardFooter className="py-4">
				<Badge variant="default">Case: {_id}</Badge>
			</CardFooter>
		</Card>
	)
}

export default CaseCard
