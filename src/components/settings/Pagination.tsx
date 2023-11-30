"use client"
import { useEffect, useState } from "react"
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input";
import { set } from "mongoose";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	pageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	pageChange,
}: PaginationProps) {
	const [search, setSearch] = useState("")

	function handleSearch() {
		if (search === "") {
			return
		}
		if (Number(search) > totalPages) {
			pageChange(totalPages)
			setSearch("")
			return
		}
		if (Number(search) < 1) {
			pageChange(1)
			setSearch("")
			return
		}
		pageChange(Number(search))
		setSearch("")
	}

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 md:flex"
						onClick={() => pageChange(1)}
						disabled={currentPage === 1}
					>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => pageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<p className="flex items-center justify-center text-xs font-medium min-w-fit w-12">
						{currentPage} of {totalPages}
					</p>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => pageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 md:flex"
						onClick={() => pageChange(totalPages)}
						disabled={currentPage === totalPages}
					>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div >
				<div className="hidden items-center space-x-2 md:flex">
					<Input
						type="number"
						min={1}
						max={totalPages}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-fit h-8"
					/>
					<Button
						variant="outline"
						className="h-8 w-fit px-2"
						onClick={() => handleSearch()}
					>Search</Button>
				</div>
			</div>
		</div>
	)
}

export default Pagination