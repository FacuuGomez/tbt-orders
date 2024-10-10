import { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/utils/database';

export default async function (req: NextApiRequest, res: NextApiResponse) {
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
