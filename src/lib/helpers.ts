import Organization from "@/db/models/organization.model";

export async function getDocs(
	model: string, 
	page: number, 
	count: number, 
	olderThan?: string, 
	newerThan?: string
	) {
	try {
		console.log(`Fetching documents for model: ${model}; page: ${page}; count: ${count}`);
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

		const res = await fetch(`${baseUrl}?${searchParams.toString()}`);

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

export async function createDoc(model: string, data: any) {
	try {
		const baseUrl = new URL(`/api/models/${model}`, window.location.origin);
		const res = await fetch(`${baseUrl}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
						'Content-Type': 'application/json'
				}
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

export async function getOrgNameById(id: string) {
	try {
		const org = await Organization.findById(id)
		if (!org) {
			throw new Error("Organization not found.")
		}
		return org.name
	} catch (error) {
		console.log(`Error getting organization name by id: ${id}`, error)
	}
}

export async function deleteDocument(model: string, id: string) {
	try {
		await fetch(`/api/models/${model}/${id}`, {
			method: 'DELETE'
		}).then
		getDocs(model, 1, 10)
	} catch (error) {
		console.error("Error deleting document: ", error)
	}
}