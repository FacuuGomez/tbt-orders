import { ref, deleteObject } from 'firebase/storage';
import { storage } from '.';

export async function deleteFile(fileUrl: string) {
	try {
		const fileRef = ref(storage, fileUrl);
		await deleteObject(fileRef);
	} catch (error) {
		console.error(`Failed to delete file: ${fileUrl}`, error);
		throw new Error('Error deleting file from Firebase');
	}
}
