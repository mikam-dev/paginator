"use client"
import React, { useState } from 'react'
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
import { NewUser } from './model-forms/NewUser'
import { NewOrg } from './model-forms/NewOrganization'
import { NewCase } from './model-forms/NewCase'

export function CreateDocumentDialog({ formSubmit }: { formSubmit: () => void }) {
	const [isDialogOpen, setDialogOpen] = useState(false);

	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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

				<Tabs defaultValue="case" className="w-full flex flex-col items-center">
					<TabsList className="mb-4">
						<TabsTrigger value="case">Case</TabsTrigger>
						<TabsTrigger value="user">User</TabsTrigger>
						<TabsTrigger value="org">Organization</TabsTrigger>
					</TabsList>
					<TabsContent className="w-full max-w-sm" value="user">
						<NewUser formSubmit={() => {
							formSubmit()
							closeDialog()
						}} />
					</TabsContent>
					<TabsContent className="w-full max-w-sm" value="org">
						<NewOrg formSubmit={() => {
							formSubmit()
							closeDialog()
						}} />
					</TabsContent>
					<TabsContent className="w-full max-w-sm" value="case">
						<NewCase formSubmit={() => {
							formSubmit()
							closeDialog()
						}} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>

	)
}

export default CreateDocumentDialog