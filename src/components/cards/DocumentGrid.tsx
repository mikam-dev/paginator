
import { useState, useEffect } from 'react'
import { SingleDoc } from "@/components/cards/SingleDoc"

export function DocumentGrid() {
	const [docs, setDocs] = useState([{}])
	const [modelType, setModelType] = useState("case")

	useEffect(() => {
		const getDocs = async () => {
			const response = await fetch(`/api/retrieve/${modelType}`)
			const data = response.json()
			setDocs([
				...docs,
				data
			])
		}
		getDocs()
		console.log(docs)
	}, [])

	return (
		<div className="w-full max-w-6xl grid grid-cols-1 px-8 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{docs.map((doc: any) =>
				<SingleDoc data={doc} model={modelType} />
			)}
		</div>
	)
}

export default DocumentGrid