import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '.';
import sharp from 'sharp';
import { Buffer } from 'buffer';
// Definir la interfaz para el archivo
interface File {
	buffer: Buffer;
	originalname: string;
	mimetype: string;
}

export async function uploadFile(
	file: File
): Promise<{ ref: any; downloadURL: string }> {
	// Procesar la imagen usando sharp
	const fileBuffer = await sharp(file.buffer)
		.resize({ width: 200, height: 200, fit: 'contain' })
		.toBuffer();

	const fileRef = ref(storage, `${file.originalname}-${Date.now()}`);

	const fileMetadata = {
		contentType: file.mimetype,
	};

	try {
		// Subir el archivo
		const fileUploadPromise = uploadBytesResumable(
			fileRef,
			fileBuffer,
			fileMetadata
		);

		await fileUploadPromise;

		// Obtener la URL de descarga
		const fileDownloadURL = await getDownloadURL(fileRef);

		return { ref: fileRef, downloadURL: fileDownloadURL };
	} catch (error) {
		console.error('Error uploading file: ', error);
		throw new Error('Error uploading file');
	}
}
