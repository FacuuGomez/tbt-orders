import { Poppins, Bebas_Neue } from 'next/font/google';

export const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const bebas_neue = Bebas_Neue({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-bebas',
	weight: ['400'],
});
