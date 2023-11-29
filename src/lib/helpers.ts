import Organization from "@/db/models/organization.model";

export async function getDocs(model: string, page: number, size: number) {
	try {
		console.log(`Fetching documents for model: ${model}; page: ${page}; size: ${size}`);
		const res = await fetch(`/api/models/${model}?&page=${page}&count=${size}`, { next: { tags: ['collection'] } });

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