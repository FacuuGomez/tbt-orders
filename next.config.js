// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// Esto permite las solicitudes CORS desde cualquier origen
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,POST,PUT,DELETE,OPTIONS',
					},
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
				],
			},
		];
	},
};

export default nextConfig;
