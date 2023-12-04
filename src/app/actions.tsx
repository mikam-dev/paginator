export async function getDocuments(
	model: string,
	page: number,
	count: number,
	olderThan?: string,
	newerThan?: string
) {
	try {
		const baseUrl = new URL(`/api/models/${model}`, window.location.origin);

		// Constructing query parameters
		const searchParams = new URLSearchParams({
			page: page.toString(),
			count: Math.min(count, 50).toString(),
		});

		if (olderThan) {
			searchParams.append('olderThan', olderThan);
		}

		if (newerThan) {
			searchParams.append('newerThan', newerThan);
		}

		const res = await fetch(`${baseUrl}?${searchParams.toString()}`, {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch documents. Status: ${res.status}`);
		}

		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Error getting documents: ", error);
	}
}

export async function createDocument(model: string, data: {}) {
	try {
		const baseUrl = new URL(`/api/models/${model}`, window.location.origin);
		const res = await fetch(`${baseUrl}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error(`Failed to create document. Status: ${res.status}`);
		}

		const createdDoc = await res.json();
		console.log(createdDoc);
		return createdDoc;
	} catch (error) {
		console.error("Error creating document: ", error);
	}
}

export async function deleteDocument(model: string, id: string) {
	try {
		const baseUrl = new URL(`/api/models/${model}/${id}`, window.location.origin);
		const res = await fetch(`${baseUrl}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			throw new Error(`Failed to delete document. Status: ${res.status}`);
		}

		const deletedDoc = await res.json();
		console.log(deletedDoc);
		return deletedDoc;
	} catch (error) {
		console.error("Error deleting document: ", error)
	}
}