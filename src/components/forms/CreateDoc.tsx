"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewUser } from './NewUser'
import { NewOrg } from './NewOrg'
import { NewCase } from './NewCase'


export function CreateDocForm() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Create New</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create new document</DialogTitle>
					<DialogDescription>
						Select the type of document you would like to create.
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="user" className="w-full flex flex-col items-center">
					<TabsList className="mb-4">
						<TabsTrigger value="user">User</TabsTrigger>
						<TabsTrigger value="org">Organization</TabsTrigger>
						<TabsTrigger value="case">Case</TabsTrigger>
					</TabsList>
					<TabsContent className="w-full max-w-sm" value="user">
						<NewUser />
					</TabsContent>
					<TabsContent className="w-full max-w-sm" value="org">
						<NewOrg />
					</TabsContent>
					<TabsContent className="w-full max-w-sm" value="case">
						<NewCase />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>

	)
}

export default CreateDocForm