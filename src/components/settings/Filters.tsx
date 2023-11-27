import React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ThemeToggle } from '../theme-toggle'
import { Settings } from 'lucide-react'

export function Filters() {
	return (
		<Popover>
			<PopoverTrigger className="border bg-card hover:bg-accent active:bg-accent outline-ring text-sm px-4 py-2 rounded-lg">
				<Settings className="w-5 h-5" />
			</PopoverTrigger>
			<PopoverContent className="mr-8">
				<div className='w-full px-8 flex justify-between items-center'>
					<p>Select Theme</p>
					<ThemeToggle />
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default Filters