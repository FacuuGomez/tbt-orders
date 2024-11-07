export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	product: string;
	image: string;
	width: string;
}

export interface Article {
	name: any;
	price: any;
	quantity: number;
	product?: any;
	size?: string;
	image?: string;
	width: any;
}

export interface Order {
	articles: Article[];
	totalBurgers: number;
	totalDrinks: number;
	totalArticles: number;
	totalAmount: number;
}

export interface Message {
	order: Order;
	orderName: string;
	orderPayment: string;
	orderDispatch: string;
	orderNote: string;
}

export interface Error {
	errorOrder: string;
	errorName: string;
	errorPayment: string;
	errorDispatch: string;
}
