import { Product } from '@/interfaces';

export const fetchNewProducts = async (apiUrl: string): Promise<Product[]> => {
	try {
		const res = await fetch(`${apiUrl}/api/products`);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const newProducts = await res.json();
		return newProducts;
	} catch (error) {
		console.error('Fetch error:', error);
		return [];
	}
};
