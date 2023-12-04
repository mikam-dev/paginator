"use client"

import React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "../ui/use-toast"

interface DateRangeSelectProps {
	className?: React.HTMLAttributes<HTMLDivElement>
	fromDate: Date | undefined
	toDate: Date | undefined
	onSetFromDate: (date: Date | undefined) => void
	onSetToDate: (date: Date | undefined) => void
}

export function DateRangeSelect({
	className,
	fromDate,
	toDate,
	onSetFromDate,
	onSetToDate,
}: DateRangeSelectProps) {
	const { toast } = useToast()

	return (
		<div className={cn("grid gap-2", className)}>
			{/* Calendar 1 i.e. "From" Date Picker */}
			<div className="flex flex-col items-start justify-evenly">
				<div className="mb-1 w-full flex justify-between items-center">
					<p>From: </p>
					{/* Button to clear/reset date range settings */}
					<Button variant="ghost" onClick={() => {
						onSetFromDate(undefined)
						onSetToDate(undefined)
					}}>Reset</Button>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] justify-start text-left font-normal",
								!fromDate && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={fromDate}
							onSelect={(value) => {
								if ((toDate) && (value) && (value > toDate)) {
									toast({
										variant: 'destructive',
										title: 'Invalid date',
										description: '"From" date cannot be after "To" date'
									})
								} else {
									onSetFromDate(value);
								}
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			{/* Calendar 2 i.e. "To" Date Picker */}
			<div className="flex flex-col items-start justify-evenly">
				<p className="mr-1">To: </p>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] justify-start text-left font-normal",
								!toDate && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							defaultMonth={toDate}
							selected={toDate}
							onSelect={(value) => {
								if ((fromDate) && (value) && (value < fromDate)) {
									toast({
										variant: 'destructive',
										title: 'Invalid date',
										description: '"To" date cannot be before "From" date',
									})
								} else {
									onSetToDate(value);
								}
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
