// import { getConnection } from '@/utils/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function Orders(req: NextApiRequest, res: NextApiResponse) {
	// const conn = await getConnection();

	const { method } = req;

	if (method === 'GET') res.status(200).json({ orders: [] });
}
