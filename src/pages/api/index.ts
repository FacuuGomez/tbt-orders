import { getConnection } from '@/utils/database/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const geekhound = [
	'__________________________',
	'--------------------------',
	'|                        |',
	'|   %%%%%%%%%%%%%%%%%%   |',
	'|   %%%%%%%%%%%%%%%%%%   |',
	'|   % %                  |',
	'|   % %                  |',
	'|   % %      %%%%%%%%%   |',
	'|   % %      %%%%%%%%%   |',
	'|   % %            % %   |',
	'|   % % @GEEKHOUND % %   |',
	'|   %%%%%%%%%%%%%%%%%%   |',
	'|   %%%%%%%%%%%%%%%%%%   |',
	'|                        |',
	'__________________________',
	'--------------------------',
	'|---     BACKEND      ---|',
	'--------------------------',
	'|---  Facundo Gomez   ---|',
	'__________________________',
	'--------------------------',
];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const conn = await getConnection();

		const response = await conn.query('SELECT NOW()');

		res.status(200).json({ connection: geekhound, time: response.rows[0].now });
	} catch (error: any) {
		res
			.status(500)
			.json({ message: 'Database connection failed', error: error.message });
	}
}
