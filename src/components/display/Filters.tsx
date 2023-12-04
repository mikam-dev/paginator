"use client"
import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import { Settings } from 'lucide-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { DateRangeSelect } from './DateRangeSelect'

interface FilterProps {
	pageSize: number;
	onPageSizeChange: (size: number) => void;
	fromDate: Date | undefined
	toDate: Date | undefined
	onSetFromDate: (date: Date | undefined) => void
	onSetToDate: (date: Date | undefined) => void
}

/**
 * Component for displaying filter options such as theme toggle, page size, and date range selection.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.pageSize - The current number of items per page.
 * @param {Function} props.onPageSizeChange - Callback when page size changes.
 * @param {Date|undefined} props.fromDate - The starting date of the filter range.
 * @param {Date|undefined} props.toDate - The ending date of the filter range.
 * @param {Function} props.onSetFromDate - Callback when the starting date changes.
 * @param {Function} props.onSetToDate - Callback when the ending date changes.
 * @returns {React.Component} A component with various filter options.
 */
export function Filters({
	pageSize,
	onPageSizeChange,
	fromDate,
	toDate,
	onSetFromDate,
	onSetToDate,
}: FilterProps) {

	return (
		<Popover>
			<PopoverTrigger className="border bg-card hover:bg-accent active:bg-accent outline-ring text-sm px-4 py-2 rounded-lg">
				<Settings className="w-5 h-5" />
			</PopoverTrigger>
			<PopoverContent className="mr-8 p-4 w-fit flex flex-col items-center justify-evenly">
				<div className='w-full mb-4 px-8 flex justify-between items-center'>
					<p>Select Theme</p>
					<ThemeToggle />
				</div>
				<div className='w-full mb-4 px-8 flex justify-between items-center'>
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
				<div className='w-full mb-4 px-8 flex-col justify-center items-start'>
					<DateRangeSelect onSetFromDate={onSetFromDate} onSetToDate={onSetToDate} fromDate={fromDate} toDate={toDate} />
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default Filters