import { getConnection } from '@/utils/database/db';
import { NextApiRequest, NextApiResponse } from 'next';
// import upload from '@/utils/multer';
// import { uploadFile } from '@/utils/uploadFile';

// export const config = {
// 	api: {
// 		bodyParser: false, // Necesario para poder manejar multipart/form-data
// 	},
// };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const conn = await getConnection();
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const query = 'SELECT * FROM products';
				const response = await conn.query(query);
				return res.json(response.rows);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}

		case 'POST':
			// Utiliza un middleware de Multer para manejar la carga de imágenes
			// await new Promise((resolve, reject) => {
			// 	upload.fields([{ name: 'image', maxCount: 1 }])(
			// 		req as any,
			// 		res as any,
			// 		(err: any) => {
			// 			if (err) return reject(err);
			// 			resolve(null);
			// 		}
			// 	);
			// });

			try {
				const { name, description, price, product, image, width } = req.body;
				// const image = req.files['image'][0]; // Accede a la imagen

				// if (!image) {
				// 	return res.status(400).json({ message: 'Debes enviar una imagen' });
				// }

				// const { downloadURL } = await uploadFile(image); // Función para subir la imagen a Firebase

				const query =
					'INSERT INTO products(name, description, price, product, image, width) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
				const values = [name, description, price, product, image, width];
				const response = await conn.query(query, values);

				return res.json(response.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		default:
			return res.status(405).json({ message: 'Method not supported' });
	}
}
