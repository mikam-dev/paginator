import React from 'react'
import { ModelSelect } from './ModelSelect'
import { Filters } from './Filters'
import { Pagination } from './Pagination'

export function SettingsBar() {
	return (
		<div className='w-full max-w-6xl px-12 py-4 flex flex-row justify-between items-center'>
			<div className='flex flex-1 justify-start'>
				<ModelSelect />
			</div>
			<div className='flex flex-1 justify-center'>
				<Pagination />
			</div>
			<div className='flex flex-1 justify-end'>
				<Filters />
			</div>
		</div>
	)
}

export default SettingsBar