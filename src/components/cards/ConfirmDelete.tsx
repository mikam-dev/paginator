"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

import { deleteDocument } from "@/app/actions"

interface ConfirmDeleteProps {
	model: string;
	id: string;
	onDelete: () => void;
}


/**
 * A confirmation dialog component for deleting a document.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.model - The model type of the document.
 * @param {string} props.id - The unique identifier of the document.
 * @param {Function} props.onDelete - Callback function to execute on successful deletion.
 * @returns {React.Component} A dialog component to confirm deletion of a document.
 */
export function ConfirmDelete({ model, id, onDelete }: ConfirmDeleteProps) {
	const { toast } = useToast()

	const handleDelete = () => {
		deleteDocument(model, id)
			.then(() => {
				onDelete();
				toast({
					description: `Document "${model}: ${id}" deleted successfully!`,
				});
			})
			.catch(() => {
				toast({
					description: `Error deleting document "${model}: ${id}".`,
					variant: "destructive",
				});
			});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<X className='w-3 h-3' />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this document.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={() => handleDelete()}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	)
}

export default ConfirmDelete