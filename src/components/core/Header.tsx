"use client"
import React from 'react'
import { ThemeToggle } from '../theme-toggle'

export default function Header() {
	return (
		<header className="sticky top-0 z-50 flex flex-row items-center justify-between w-full h-14 px-2 shadow">
			<div>Logo</div>
			<div>Paginator</div>
			<div>
				<ThemeToggle />
			</div>
		</header>
	)
}
