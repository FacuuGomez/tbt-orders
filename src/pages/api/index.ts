import { getConnection } from '@/utils/database';
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
		// Configura manualmente los encabezados CORS
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Origin', '*'); // Puedes cambiar '*' por un dominio específico
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET,OPTIONS,PATCH,DELETE,POST,PUT'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
		);

		if (req.method === 'OPTIONS') {
			// Responde a las solicitudes preflight con un estado 200
			res.status(200).end();
			return;
		}

		const conn = await getConnection();

		const response = await conn.query('SELECT NOW()');

		res.status(200).json({ connection: geekhound, time: response.rows[0].now });
	} catch (error: any) {
		res
			.status(500)
			.json({ message: 'Database connection failed', error: error.message });
	}
}
