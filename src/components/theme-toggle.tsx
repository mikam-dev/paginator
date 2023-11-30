"use client"
import { Moon, Sun } from "lucide-react"
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()
	const [_, startTransition] = React.useTransition()

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => {
				startTransition(() => {
					setTheme(theme === 'light' ? 'dark' : 'light')
				})
			}}
		>
			{!theme ? null : theme === 'dark' ? (
				<Moon className="transition-all" />
			) : (
				<Sun className="transition-all" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
