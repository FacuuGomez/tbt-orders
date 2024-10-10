import { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body,
		query: { id },
	} = req;

	switch (method) {
		case 'GET':
			try {
				const text = 'SELECT * FROM products WHERE id = $1';
				const values = [id];
				const result = await conn.query(text, values);

				if (result.rowCount === 0)
					return res.status(404).json({ message: 'Product not found' });

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		case 'PUT':
			try {
				const { name, description, price } = body;
				const text =
					'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *';
				const values = [name, description, price, id];
				const result = await conn.query(text, values);

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		case 'DELETE':
			try {
				const text = 'DELETE FROM products WHERE id = $1 RETURNING *';
				const values = [id];
				const result = await conn.query(text, values);

				if (result.rowCount === 0)
					return res.status(404).json({ message: 'Product not found' });

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		default:
			return res.status(400).json({ message: 'Method are not supported' });
	}
};
