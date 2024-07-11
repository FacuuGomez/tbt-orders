import type { Metadata } from 'next';
// import { Poppins } from 'next/font/google';
import './globals.css';
import { poppins } from '../../public/fonts/fonts';

// const poppins = Poppins({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'TBT - Pedidos',
	description: 'Created by Geekhound',
	icons: {
		icon: ['/favicon.ico'],
		apple: ['/apple-touch-icon.png?v=4'],
		shortcut: ['/apple-touch-icon.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
