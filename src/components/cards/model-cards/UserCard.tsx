"use client"
import Image from "next/image"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDelete } from '../ConfirmDelete'
import { IUser } from "@/db/models/user.model"

interface UserCardProps {
	data: IUser,
	onDelete: () => void
}

export function UserCard({ data, onDelete }: UserCardProps) {
	const { _id, organization, info, assets } = data

	const dateOfBirth = new Date(info?.dob)

	return (
		<Card className="bg-card flex flex-col justify-between">
			<CardHeader>
				<div className="flex flex-row w-full justify-between items-start">
					<CardTitle>
						{info?.given_name}{" "}{info?.family_name}
					</CardTitle>
					<Button variant="destructive" size="icon" className="w-4 h-4">
						<ConfirmDelete onDelete={() => onDelete()} model="user" id={_id} />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
				<CardDescription className="flex flex-col items-start justify-evenly">
					<Image src={"/user.svg"} alt={"avatar"} width={36} height={36} />
					<p>{organization?.name}</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex flex-col flex-1 h-fit max-h-[200px] overflow-auto justify-start items-start">
					<p><strong>Email:</strong> {info?.email}</p>
					<p><strong>Phone:</strong> {info?.phone}</p>
					<p><strong>DoB:</strong> {dateOfBirth.toLocaleDateString()}</p>
				</ScrollArea>
			</CardContent>
			<CardFooter className="py-4">
				<Badge variant="default">User</Badge>
			</CardFooter>
		</Card>
	)
}

export default UserCard