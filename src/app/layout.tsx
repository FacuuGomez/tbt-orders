import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { poppins } from '../../public/fonts/fonts';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'TBT - Pedidos',
	description: 'Created by Geekhound',
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
