import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export function ModelSelect() {

	return (
		<Select>
			<SelectTrigger className="min-w-fit w-[50%] hover:bg-accent active:bg-accent">
				<SelectValue placeholder="Select Model" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="user">Users</SelectItem>
				<SelectItem value="organization">Organizations</SelectItem>
				<SelectItem value="case">Cases</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default ModelSelect