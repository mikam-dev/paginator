"use client"
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { CreateDocumentDialog } from '@/components/forms/CreateDocument'

export function Header({ formSubmit }: { formSubmit: () => void }) {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-center w-full h-14 px-8 shadow bg-background">
			<div className='w-full max-w-6xl flex flex-row items-center justify-between'>
				<Link href="/">
					<BookOpen className='w-8 h-8' />
				</Link>
				<CreateDocumentDialog formSubmit={() => formSubmit()} />
			</div>
		</header>
	)
}
export default Header