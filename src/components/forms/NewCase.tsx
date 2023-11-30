"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import { createDoc } from "@/lib/helpers"

const formSchema = z.object({
	client: z.object({
		given_name: z.string().min(2),
		family_name: z.string().min(2),
		email: z.string().email(),
		phone: z.string().min(2),
		address: z.object({
			line1: z.string().min(2),
			line2: z.string().optional(),
			city: z.string().min(2),
			state: z.string().min(2),
			zip: z.string().min(2),
		}),
	}),
	incident: z.object({
		date: z.date(),
		address: z.object({
			line1: z.string().min(2),
			line2: z.string().optional(),
			city: z.string().min(2),
			state: z.string().min(2),
			zip: z.string().min(2),
		}),
		details: z.string().min(2),
	}),
	recovery: z.object({
		expected: z.number().gte(10000).lte(500000),
		actual: z.number().gte(10000).lte(500000),
		received: z.date(),
	}),
})

export function NewCase({ formSubmit }: { formSubmit: () => void }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			client: {
				given_name: "",
				family_name: "",
				email: "",
				phone: "",
				address: {
					line1: "",
					line2: "",
					city: "",
					state: "",
					zip: "",
				},
			},
			incident: {
				date: new Date(),
				address: {
					line1: "",
					line2: "",
					city: "",
					state: "",
					zip: "",
				},
				details: "",
			},
			recovery: {
				expected: 10000,
				actual: 10000,
				received: new Date(),
			},
		},
	})


	function onSubmit(values: z.infer<typeof formSchema>) {
		createDoc("case", values)
		formSubmit()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="client.given_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.family_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input placeholder="Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="email@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input type="phone" placeholder="800-123-4567" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.address.line1"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street Address</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.address.line2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street Address 2 {"(optional)"}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								e.g. Apt. 123, Suite 456, etc.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.address.city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.address.state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="client.address.zip"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Zip</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Incident Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.address.line1"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street Address</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.address.line2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street Address 2 {"(optional)"}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								e.g. Apt. 123, Suite 456, etc.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.address.city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.address.state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.address.zip"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Zip</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="incident.details"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Details</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="recovery.expected"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expected Recovery</FormLabel>
							<FormControl>
								<Input
									type="number" {...field}
									min={0}
									maxLength={10}
									onChange={(e) => {
										const number = parseInt(e.target.value)
										form.setValue("recovery.expected", number)
									}} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="recovery.actual"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Actual Recovery</FormLabel>
							<FormControl>
								<Input
									type="number" {...field}
									min={0}
									maxLength={10}
									onChange={(e) => {
										const number = parseInt(e.target.value)
										form.setValue("recovery.actual", number)
									}} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="recovery.received"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Recovery Received</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
