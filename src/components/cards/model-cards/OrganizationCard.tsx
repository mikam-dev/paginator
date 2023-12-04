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

import { IOrganization } from "@/db/models/organization.model";

interface OrgCardProps {
	data: IOrganization;
	onDelete: () => void;
}

export function OrganizationCard({ data, onDelete }: OrgCardProps) {
	const { _id, name, location, members = [] } = data;

	return (
		<Card className="bg-card flex flex-col justify-between">
			<CardHeader>
				<div className="flex flex-row w-full justify-between items-start">
					<CardTitle>{name}</CardTitle>
					<Button variant="destructive" size="icon" className="w-4 h-4">
						<ConfirmDelete onDelete={() => onDelete()} model="organization" id={_id} />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
				<CardDescription className="flex flex-col items-start justify-evenly">
					<p>{location?.line1}</p>
					<p>{location?.line2}</p>
					<p>{location?.city}, {location?.state}</p>
					<p>{location?.zip}</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex flex-col flex-1 h-fit max-h-[200px] overflow-auto justify-start items-start">
					{members.map((member, index) => (
						<p key={index}>{member}</p>
					))}
				</ScrollArea>
			</CardContent>
			<CardFooter className="py-4">
				<Badge variant="default">Organization</Badge>
			</CardFooter>
		</Card>
	)
}

export default OrganizationCard;
