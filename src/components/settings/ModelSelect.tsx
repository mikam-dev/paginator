"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface ModelSelectProps {
	model: string;
	onModelChange: (model: string) => void;
}

export function ModelSelect({ model, onModelChange }: ModelSelectProps) {
	return (
		<Select
			value={model}
			onValueChange={(value) => {
				onModelChange(value);
			}}>
			<SelectTrigger className="min-w-fit w-[50%] hover:bg-accent active:bg-accent px-4 py-2">
				<SelectValue placeholder={"Cases"} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="case">Cases</SelectItem>
				<SelectItem value="user">Users</SelectItem>
				<SelectItem value="organization">Organizations</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default ModelSelect