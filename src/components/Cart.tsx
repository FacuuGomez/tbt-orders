'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
// import american_burger from '../../public/assets/american-burger.jpg';
// import cheese_burger from '../../public/assets/cheese-burger.jpg';
// import { createOrder } from '@/actions/orders-actions';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CartProps {
	order: Order;
	modalIsOpen: boolean;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	closeModal: () => void;
}

type deleteOrderHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type orderHandler = (event: React.FormEvent<HTMLFormElement>) => void;

type messageOrderHandler = (
	event:
		| React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>
		| React.ChangeEvent<HTMLTextAreaElement>
) => void;

type ArticleName =
	| 'American burger'
	| 'Cheese burger'
	| 'Burger 4 quesos'
	| 'BBQ burger'
	| 'Coca Cola'
	| 'Schneider';

interface Article {
	name: ArticleName;
	price: number;
	quantity: number;
	image: string;
}

interface Order {
	articles: Article[];
	totalBurgers: number;
	totalDrinks: number;
	totalArticles: number;
	totalAmount: number;
}

interface Message {
	order: Order;
	orderName: string;
	orderPayment: string;
	orderDispatch: string;
	orderNote: string;
}

interface Error {
	errorOrder: string;
	errorName: string;
	errorPayment: string;
	errorDispatch: string;
}

export const Cart = ({
	closeModal,
	order,
	setOrder,
	modalIsOpen,
}: CartProps) => {
	const [error, setError] = useState<Error>({
		errorOrder: '',
		errorName: '',
		errorPayment: '',
		errorDispatch: '',
	});
	const [message, setMessage] = useState<Message>({
		order,
		orderName: '',
		orderPayment: '',
		orderDispatch: '',
		orderNote: '',
	});

	const formRef = useRef<HTMLFormElement>(null);

	const deleteOrder: deleteOrderHandler = (event) => {
		// console.log('cart', order);
		// console.log('cart', event.currentTarget.name);
		// const addItem = () => {
		// setOrder((prevOrder) => ({
		//   ...prevOrder,
		//   items: [...prevOrder.items, 'New Item'],
		// }));
	};

	const handleMessageChange: messageOrderHandler = (event) => {
		const target = event.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement;

		setMessage({
			...message,
			order,
			[target.name]: target.value,
		});

		setError((prev) => ({
			...prev,
			[target.name === 'orderName'
				? 'errorName'
				: target.name === 'orderPayment'
				? 'errorPayment'
				: 'errorDispatch']: '',
		}));
	};

	// const handleSubmit: orderHandler = (event) => {
	// 	event.preventDefault();

	// 	console.log('message submit', message);

	// 	if (!message.orderName) {
	// 		setError({ ...error, errorName: 'Completar nombre.' });
	// 	}
	// 	if (!message.orderPayment) {
	// 		setError({ ...error, errorPayment: 'Seleccionar medio de pago.' });
	// 	}
	// 	if (!message.orderDispatch) {
	// 		setError({ ...error, errorDispatch: 'Seleccionar envio o retiro.' });
	// 	}

	// 	if (error) return;

	// 	// if (
	// 	// 	!message.orderDispatch ||
	// 	// 	!message.orderPayment ||
	// 	// 	!message.orderDispatch
	// 	// ) {
	// 	// 	setError('Completar formulario');
	// 	// 	return;
	// 	// }

	// 	const phoneNumber = '541141786108';

	// const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
	// 	`\n*Nombre*: ${message.orderName}\n*Pago*: ${
	// 		message.orderPayment
	// 	}\n*Delivery*: ${
	// 		message.orderDispatch
	// 	}\n\n-------------------------------\nPEDIDO\n\n${order.articles
	// 		.map((article) => {
	// 			return `- ${article.name}: ${article.quantity} x $${
	// 				article.price
	// 			} = $${article.price * article.quantity}\n\n`;
	// 		})
	// 		.join('')}CANT. BURGERS: ${order.totalBurgers}\nCANT. BEBIDAS: ${
	// 		order.totalDrinks
	// 	}\n\n*TOTAL: $${order.totalAmount}*\n-------------------------------\n\n${
	// 		message.orderNote ? `*Observación*: ${message.orderNote}` : ''
	// 	}`
	// )}`;

	// 	// const order = await createOrder(formData);

	// 	window.open(whatsappLink, '_blank');

	// 	formRef.current?.reset();
	// };

	const handleSubmit: orderHandler = (event) => {
		event.preventDefault();

		setError({
			errorOrder: '',
			errorName: '',
			errorPayment: '',
			errorDispatch: '',
		});

		let formIsValid = true;

		if (!order.totalArticles) {
			setError((prev) => ({
				...prev,
				errorOrder: '¡ No hay articulos cargados !',
			}));
			formIsValid = false;
		}

		if (!message.orderName) {
			setError((prev) => ({
				...prev,
				errorName: 'Completa el nombre.',
			}));
			formIsValid = false;
		}

		if (!message.orderPayment || message.orderPayment === 'Método de pago') {
			setError((prev) => ({
				...prev,
				errorPayment: 'Selecciona un método de pago válido.',
			}));
			formIsValid = false;
		}

		if (!message.orderDispatch || message.orderDispatch === 'Envio/Retiro') {
			setError((prev) => ({
				...prev,
				errorDispatch: 'Selecciona una opción de envío o retiro.',
			}));
			formIsValid = false;
		}

		if (formIsValid) {
			const phoneNumber = '541141786108';
			const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
				`\n*Nombre*: ${message.orderName}\n*Pago*: ${
					message.orderPayment
				}\n*Delivery*: ${
					message.orderDispatch
				}\n\n-------------------------------\nPEDIDO\n\n${order.articles
					.map((article) => {
						return `- ${article.name}: ${article.quantity} x $${
							article.price
						} = $${article.price * article.quantity}\n\n`;
					})
					.join('')}CANT. BURGERS: ${order.totalBurgers}\nCANT. BEBIDAS: ${
					order.totalDrinks
				}\n\n*TOTAL: $${
					order.totalAmount
				}*\n-------------------------------\n\n${
					message.orderNote ? `*Observación*: ${message.orderNote}` : ''
				}`
			)}`;

			window.open(whatsappLink, '_blank');
			formRef.current?.reset();
		}
	};

	useEffect(() => {
		if (order.totalArticles > 0) {
			setError((prev) => ({
				...prev,
				errorOrder: '',
			}));
		}
	}, [order]);

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<AnimatePresence>
				{modalIsOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.2,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						exit={{ opacity: 0, scale: 0 }}
						className='relative justify-center text-center bg-[#b89061] m-5 md:max-w-2xl w-full p-6 rounded-3xl'
					>
						<div>
							<button className='flex' onClick={closeModal}>
								<FontAwesomeIcon
									className='absolute top-6 right-6 w-8 h-8 hover:opacity-80 active:opacity-60 cursor-pointer'
									icon={faCircleXmark}
								/>
							</button>

							<h3 className='text-2xl font-bold pb-6'>PEDIDO</h3>

							<div className='relative flex justify-center'>
								{/* {order.totalArticles > 1 ? (
									<div className='absolute top-0 left-0 w-full h-10 mr-2 gradient-top'></div>
								) : (
									''
								)} */}

								<ul className='w-full pr-[6px] max-h-[200px] sm:max-h-[300px] snap-y overflow-y-auto'>
									{!order.totalArticles ? (
										<li className='flex justify-center items-center text-2xl h-10'>
											No hay articulos cargados.
										</li>
									) : (
										order.articles.map((article) => (
											<li
												className='flex justify-between items-center mb-2'
												key={article.name}
											>
												<div className='flex items-center'>
													<Image
														src={`/assets/${article.image}`}
														className='w-24 sm:w-26 mr-4 cursor-pointer rounded-2xl'
														alt='American burger'
														width={90}
														height={90}
													/>

													<div>
														<p className='font-semibold text-lg text-start'>
															{article.name}
														</p>
														<p>
															Cantidad: {article.quantity} x ${article.price}
														</p>
													</div>
												</div>

												<button className='flex' onClick={deleteOrder}>
													<FontAwesomeIcon
														className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
														icon={faTrash}
													/>
												</button>
											</li>
										))
									)}
								</ul>

								{/* {order.totalArticles > 1 ? (
									<div className='absolute bottom-0 left-0 w-full h-10 gradient-bottom'></div>
								) : (
									''
								)} */}
							</div>

							<div className='my-2 font-medium text-[#491718]'>
								<p>Subtotal: ${order.totalAmount}</p>
							</div>

							<hr className='border-2 border-[#491718] rounded-full my-2' />

							{error.errorOrder && (
								<motion.p
									initial={{ opacity: 0, y: -15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: 0,
									}}
									className='ml-2 mb-2 text-red-600 font-medium text-sm'
								>
									{error.errorOrder}
								</motion.p>
							)}

							<form onSubmit={handleSubmit} ref={formRef}>
								<input
									className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
									type='text'
									placeholder='Nombre'
									name='orderName'
									value={message.orderName}
									autocomplete='off'
									onChange={handleMessageChange}
								/>

								{error.errorName && (
									<motion.p
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0,
										}}
										className='flex ml-2 mb-2 text-red-600 font-medium text-sm'
									>
										{error.errorName}
									</motion.p>
								)}

								<select
									className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
									name='orderPayment'
									value={message.orderPayment}
									onChange={handleMessageChange}
								>
									<option className='text-black/60' value='Método de pago'>
										Método de pago
									</option>
									<option value='Efectivo'>Efectivo</option>
									<option value='Tranferencia'>Transferencia</option>
								</select>

								{error.errorPayment && (
									<motion.p
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0,
										}}
										className='flex ml-2 mb-2 text-red-600 font-medium text-sm'
									>
										{error.errorPayment}
									</motion.p>
								)}

								<select
									className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
									name='orderDispatch'
									value={message.orderDispatch}
									onChange={handleMessageChange}
								>
									<option className='text-black/60' value='Envio/Retiro'>
										Envio / Retiro
									</option>
									<option value='Envio'>Quiero que me lo envien</option>
									<option value='Retiro'>Lo retiro yo mismo</option>
								</select>

								{error.errorDispatch && (
									<motion.p
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0,
										}}
										className='flex ml-2 mb-2 text-red-600 font-medium text-sm'
									>
										{error.errorDispatch}
									</motion.p>
								)}

								<textarea
									className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
									name='orderNote'
									placeholder='¿ Alguna observación ?'
									value={message.orderNote}
									onChange={handleMessageChange}
								></textarea>

								<div className='flex justify-center font-bold text-2xl my-4'>
									<p>Total:</p>
									<p className='text-[#491718] ml-2'>${order.totalAmount}</p>
								</div>

								<button
									className='bg-[#491718] active:opacity-60 sm:hover:opacity-80 text-[#d2a772] font-semibold p-4 rounded-2xl w-full'
									type='submit'
								>
									Enviar pedido
								</button>
							</form>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
