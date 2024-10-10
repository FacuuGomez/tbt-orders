export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	product: string;
}

type ArticleName =
	| 'American burger'
	| 'Cheese burger'
	| 'Burger 4 quesos'
	| 'BBQ burger'
	| 'Coca Cola'
	| 'Schneider';

export interface Article {
	name: any;
	price: any;
	quantity: number;
	image?: string;
	size?: string;
	product?: any;
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
