import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import './global.css';
import Head from 'next/head';

const poppins = Poppins({
	weight: ['400', '700'],
	subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={poppins.className} suppressHydrationWarning>
			<Head>
				<title>The Burger Town</title>
				<meta
					name='description'
					content='Disfruta de hamburguesas artesanales con ingredientes frescos. Haz tu pedido online y vive una experiencia deliciosa en minutos.'
				/>
			</Head>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
