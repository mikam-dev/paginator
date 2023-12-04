"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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

import { createDocument } from "@/app/actions"
import { formatZipCode } from "@/lib/utils"

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	location: z.object({
		line1: z.string().min(2, "Street address must be at least 2 characters"),
		line2: z.string().optional(),
		city: z.string().min(2, "City must be at least 2 characters"),
		state: z.string().min(2, "State must be at least 2 characters"),
		zip: z.string().length(5, "Zip code must be 5 digits"),
	}),
})

/**
 * Form for creating a new organization.
 * Allows input of organization name and location details.
 *
 * @param {Function} formSubmit - Function to execute on form submission.
 * @returns {React.Component} A form component for creating a new organization.
 */
export function NewOrg({ formSubmit }: { formSubmit: () => void }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			location: {
				line1: "",
				line2: "",
				city: "",
				state: "",
				zip: "",
			},
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		createDocument("organization", values)
		formSubmit()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Oranization Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								This is your organization name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location.line1"
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
					name="location.line2"
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
					name="location.city"
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
					name="location.state"
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
					name="location.zip"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Zip Code</FormLabel>
							<FormControl>
								<Input
									type="text"
									{...form.register("location.zip")}
									onChange={(e) => {
										const formattedZipCode = formatZipCode(e.target.value);
										e.target.value = formattedZipCode; // Set the formatted value
										form.setValue("location.zip", formattedZipCode); // Update React Hook Form value
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
