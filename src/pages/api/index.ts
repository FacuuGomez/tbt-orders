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

import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/utils/database';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const response = await conn.query('SELECT NOW()');

	res.status(200).json({ conection: geekhound, time: response.rows[0].now });
}
