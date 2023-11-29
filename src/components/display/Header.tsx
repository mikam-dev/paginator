"use client"
import { BookOpen } from 'lucide-react'
import { CreateDocForm } from '../forms/CreateDoc'
import Link from 'next/link'

export default function Header() {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-center w-full h-14 px-8 shadow bg-background">
			<div className='w-full max-w-6xl flex flex-row items-center justify-between'>
				<Link href="/">
					<BookOpen className='w-8 h-8' />
				</Link>
				<CreateDocForm />
			</div>
		</header>
	)
}
