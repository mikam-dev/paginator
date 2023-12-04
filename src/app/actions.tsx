/**
 * Fetches documents from the server based on the specified model, page, count, and date filters.
 *
 * @param {string} model - The model type for the documents.
 * @param {number} page - The current page number for pagination.
 * @param {number} count - The number of documents per page.
 * @param {string} [olderThan] - Optional filter for documents older than a specific date.
 * @param {string} [newerThan] - Optional filter for documents newer than a specific date.
 * @returns {Promise<object>} A promise that resolves to the fetched data.
 */
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
		// console.log(data)
		return data;
	} catch (error) {
		console.error("Error getting documents: ", error);
	}
}

/**
 * Creates a new document of the specified model type.
 *
 * @param {string} model - The model type for the document.
 * @param {object} data - The data for the new document.
 * @returns {Promise<object>} A promise that resolves to the created document.
 */
export async function createDocument(model: string, data: {}) {
	try {
		const baseUrl = new URL(`/api/models/${model}`, window.location.origin);
		const res = await fetch(`${baseUrl}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error(`Failed to create document. Status: ${res.status}`);
		}

		const createdDoc = await res.json();
		// console.log(createdDoc)
		return createdDoc;
	} catch (error) {
		console.error("Error creating document: ", error);
	}
}

/**
 * Deletes a document based on the specified model and ID.
 *
 * @param {string} model - The model type for the document.
 * @param {string} id - The unique identifier of the document.
 * @returns {Promise<object>} A promise that resolves to the deleted document data.
 */
export async function deleteDocument(model: string, id: string) {
	try {
		const baseUrl = new URL(`/api/models/${model}/${id}`, window.location.origin);
		await fetch(`${baseUrl}`, {
			method: 'DELETE'
		});
	} catch (error) {
		console.error("Error deleting document: ", error)
	}
}