"use client"

import React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

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
	return (
		<div className={cn("grid gap-2", className)}>
			<div className="flex flex-col items-start justify-evenly">
				<p className="mr-1">From: </p>
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
								onSetFromDate(value);
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
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
								onSetToDate(value);
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
