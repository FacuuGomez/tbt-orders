// import { conn } from '@/utils/database';
import { getConnection } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	// // Configura manualmente los encabezados CORS
	// res.setHeader('Access-Control-Allow-Credentials', 'true');
	// res.setHeader('Access-Control-Allow-Origin', '*'); // Puedes cambiar '*' por tu dominio en Vercel, como 'https://tu-dominio.vercel.app'
	// res.setHeader(
	// 	'Access-Control-Allow-Methods',
	// 	'GET,OPTIONS,PATCH,DELETE,POST,PUT'
	// );
	// res.setHeader(
	// 	'Access-Control-Allow-Headers',
	// 	'X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	// );

	// // Maneja las solicitudes preflight (OPTIONS)
	// if (req.method === 'OPTIONS') {
	// 	res.status(200).end();
	// 	return;
	// }

	const conn = await getConnection();
	const { method, body } = req;

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
			try {
				const { name, description, price, product } = body;

				const query =
					'INSERT INTO products(name, description, price, product) VALUES ($1, $2, $3, $4) RETURNING *';
				const values = [name, description, price, product];
				const response = await conn.query(query, values);

				return res.json(response.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		default:
			return res.status(400).json({ message: 'Method are not supported' });
	}
}
