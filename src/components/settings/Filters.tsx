"use client"
import React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ThemeToggle } from '../theme-toggle'
import { Settings } from 'lucide-react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

interface FilterProps {
	pageSize: number;
	onPageSizeChange: (size: number) => void;
}

export function Filters({
	pageSize,
	onPageSizeChange
}: FilterProps) {
	return (
		<Popover>
			<PopoverTrigger className="border bg-card hover:bg-accent active:bg-accent outline-ring text-sm px-4 py-2 rounded-lg">
				<Settings className="w-5 h-5" />
			</PopoverTrigger>
			<PopoverContent className="mr-8 p-4 flex flex-col items-center justify-evenly">
				<div className='w-full mb-2 px-8 flex justify-between items-center'>
					<p>Select Theme</p>
					<ThemeToggle />
				</div>
				<div className='w-full mb-2 px-8 flex justify-between items-center'>
					<p>Range</p>
				</div>
				<div className='w-full mb-2 px-8 flex justify-between items-center'>
					<p className="flex items-center justify-center min-w-fit">Page size</p>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => {
							onPageSizeChange(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-20">
							<SelectValue placeholder={String(pageSize)} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={String(size)}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default Filters