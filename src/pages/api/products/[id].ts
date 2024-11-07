import { getConnection } from '@/utils/database/db';
import { NextApiRequest, NextApiResponse } from 'next';
// import { deleteFile } from '@/utils/deleteFile';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body,
		query: { id },
	} = req;

	const conn = await getConnection();

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
				const { name, description, price, product, image, width } = body;
				const text =
					'UPDATE products SET name = $1, description = $2, price = $3, product = $4, image = $5, width = $6 WHERE id = $7 RETURNING *';
				const values = [name, description, price, product, image, width, id];
				const result = await conn.query(text, values);

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		case 'DELETE':
			try {
				const selectQuery = 'SELECT * FROM products WHERE id = $1';
				const selectValues = [id];
				const productResult = await conn.query(selectQuery, selectValues);

				if (productResult.rowCount === 0) {
					return res.status(404).json({ message: 'Product not found' });
				}

				// const product = productResult.rows[0];
				// const imageUrl = product.image;

				// if (imageUrl) {
				// 	await deleteFile(imageUrl);
				// }

				const deleteQuery = 'DELETE FROM products WHERE id = $1 RETURNING *';
				const deleteValues = [id];
				const deleteResult = await conn.query(deleteQuery, deleteValues);

				if (deleteResult.rowCount === 0) {
					return res.status(404).json({ message: 'Product not found' });
				}

				return res.json(deleteResult.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		default:
			return res.status(400).json({ message: 'Method are not supported' });
	}
};
