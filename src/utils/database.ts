import { Pool } from 'pg';

let conn: any;

if (!conn) {
	conn = new Pool({
		user: 'postgres',
		password: 'password',
		host: 'localhost',
		port: 5432,
		database: 'tbt_orders',
	});
}

export { conn };
