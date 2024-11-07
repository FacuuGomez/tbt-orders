import { NextApiRequest } from 'next';

// Extiende NextApiRequest para incluir la propiedad files
declare module 'next' {
	interface NextApiRequest {
		files: {
			[fieldname: string]: Express.Multer.File[]; // Ajusta el tipo según tus necesidades
		};
	}
}
