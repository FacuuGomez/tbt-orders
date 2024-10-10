import type { NextApiRequest, NextApiResponse } from 'next';

export default function Orders(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.method, req.url);

	const { method } = req;

	if (method === 'GET') res.status(200).json({ orders: [] });
}
