'use server';

export const createOrder = async (formData: FormData) => {
	const orderName = formData.get('orderName');
	const orderPayment = formData.get('orderPayment');
	const orderDispatch = formData.get('orderDispatch');

	if (!orderName || !orderPayment || !orderDispatch) return;

	const newOrder = {
		name: orderName,
		paymant: orderPayment,
		orderDispatch,
	};

	console.log(newOrder);
	return newOrder;
};
