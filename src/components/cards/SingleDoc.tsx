import React, { Suspense } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { DeleteAlert } from './ConfirmDelete'


export function SingleDoc({ model, data }: { model: string, data: any }) {
	const { title, description } = data

	return (
		<Card className="bg-card">
			<CardHeader>
				<Suspense fallback={<Skeleton />}>
					<div className="flex flex-row w-full justify-between items-start">
						<CardTitle>{title ? title : 'Title'}</CardTitle>
						<Button variant="destructive" size="icon" className="w-4 h-4">
							<DeleteAlert />
							<span className="sr-only">Delete</span>
						</Button>
					</div>
					<CardDescription>{description ? description : 'Description'}</CardDescription>
				</Suspense>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<Skeleton />}>
					<p>Content</p>
				</Suspense>
			</CardContent>
			<CardFooter>
				<Suspense fallback={<Skeleton />}>
					<Badge variant="secondary">{model?.toUpperCase()}</Badge>
				</Suspense>
			</CardFooter>
		</Card>
	)
}

export default SingleDoc