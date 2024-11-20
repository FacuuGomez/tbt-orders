'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Order, Message, Error } from '@/interfaces';

const deliveryValue = 2000;

type deleteOrderHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type orderHandler = (event: React.FormEvent<HTMLFormElement>) => void;

type messageOrderHandler = (
	event:
		| React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>
		| React.ChangeEvent<HTMLTextAreaElement>
) => void;

interface CartProps {
	order: Order;
	modalIsOpen: boolean;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	closeModal: () => void;
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
		errorAddress: '',
	});
	const [message, setMessage] = useState<Message>({
		order,
		orderName: '',
		orderPayment: '',
		orderDispatch: '',
		orderAddress: '',
		orderNote: '',
	});
	const [delivery, setDelivery] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		fetch('/api/phoneNumber')
			.then((res) => res.json())
			.then((data) => setPhoneNumber(data.phoneNumber))
			.catch((error) => console.error('Error fetching phone number:', error));
	}, []);

	// const deleteOrder: deleteOrderHandler = (event) => {
	// 	const newOrder = order.articles.filter(
	// 		(article) => article.name !== event.currentTarget.name
	// 	);

	// 	setOrder({
	// 		...order,
	// 		articles: newOrder,
	// 	});
	// };

	const handleMessageChange: messageOrderHandler = (event) => {
		const target = event.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement;

		if (target.value === 'Envio/Retiro') setDelivery(false);
		if (target.value === 'Retiro') {
			setDelivery(false);
			setError((prev) => ({
				...prev,
				errorAddress: '',
			}));
		}
		if (target.value === 'Envio') setDelivery(true);

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
				: target.name === 'orderAddress'
				? 'errorAddress'
				: 'errorDispatch']: '',
		}));
	};

	useEffect(() => {
		if (!delivery)
			setMessage({
				...message,
				orderAddress: '',
			});
	}, [delivery]);

	const handleSubmit: orderHandler = (event) => {
		event.preventDefault();

		setError({
			errorOrder: '',
			errorName: '',
			errorPayment: '',
			errorDispatch: '',
			errorAddress: '',
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

		if (message.orderDispatch === 'Envio' && !message.orderAddress) {
			setError((prev) => ({
				...prev,
				errorAddress: 'Completa la dirección.',
			}));
			formIsValid = false;
		}

		if (formIsValid) {
			const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
				`\n*Nombre:* ${message.orderName}\n*Pago:* ${
					message.orderPayment
				}\n*Delivery:* ${delivery ? 'Si' : 'No'}${
					message.orderAddress ? `\n*Dirección:* ${message.orderAddress}` : ''
				}${
					message.orderNote ? `\n*Observación:* ${message.orderNote}` : ''
				}\n-------------------------------\n*PEDIDO*\n\n${order.articles
					.map((article) => {
						const sizeText =
							article.product === 'burger' && article.size
								? ` (${article.size})`
								: '';
						return `- ${article.name}${sizeText}: ${article.quantity} x $${
							article.price
						} = $${article.price * article.quantity}\n`;
					})
					.join('')}${
					delivery ? `\n*Envio:* $${deliveryValue}\n` : '\n'
				}*Subtotal:* $${
					order.totalAmount
				}\n-------------------------------\nCANT. BURGERS: ${
					order.totalBurgers
				}\n\n*TOTAL: $${
					delivery ? order.totalAmount + deliveryValue : order.totalAmount
				}*\n-------------------------------`
			)}`;

			// CANT. BEBIDAS: ${order.totalDrinks}\n\n

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
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen '>
			<AnimatePresence>
				{modalIsOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.1,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						exit={{ opacity: 0, scale: 0 }}
						className='relative justify-center text-center bg-[#d2a772] m-4 md:max-w-2xl w-full p-4 rounded-3xl'
					>
						<div>
							<button className='flex' onClick={closeModal}>
								<FontAwesomeIcon
									className='absolute top-4 right-4 w-8 h-8 hover:text-[#3a1212] active:text-[#491718] cursor-pointer'
									icon={faCircleXmark}
								/>
							</button>

							<h3 className='text-3xl font-bold pb-6'>PEDIDO</h3>

							<div className='relative flex justify-center'>
								{/* {order.totalArticles > 1 ? (
									<div className='absolute top-0 left-0 w-full h-10 mr-2 gradient-top'></div>
								) : (
									''
								)} */}

								<ul className='w-full max-h-[200px] sm:max-h-[300px] snap-y overflow-y-auto'>
									{!order.totalArticles ? (
										<li className='flex justify-center items-center text-xl h-10 mb-4 opacity-60'>
											No hay artículos cargados.
										</li>
									) : (
										order.articles.map((article, index) => (
											<li
												className='flex justify-between items-center mb-2 mr-[6px]'
												key={`${article.name}-${index}`}
											>
												<div className='flex items-center w-full'>
													{/* <Image
														src={`/assets/${article.image}`}
														className='w-20 sm:w-28 mr-4 cursor-pointer rounded-2xl'
														alt='American burger'
														width={90}
														height={90}
													/> */}

													<div>
														<div className='size-28 sm:size-32 mr-4 rounded-2xl bg-[#491718] flex justify-center items-center'>
															{article.image ? (
																<Image
																	src={article.image}
																	alt={article.name}
																	className='custom-shadow object-cover'
																	style={{ width: `${article.width - 10}px` }}
																	width={500}
																	height={400}
																/>
															) : (
																<p className='text-center text-[#d2a772]'>
																	{article.name}
																</p>
															)}
														</div>
													</div>

													<div className='w-full'>
														<p className='font-semibold sm:text-lg text-start'>
															{article.name}
														</p>

														<div className='flex justify-between'>
															<div>
																<p className='flex justify-start'>
																	{article.product === 'burger'
																		? article.size
																		: 'Unidad'}
																</p>
																<p className='flex justify-start'>
																	Cant.: {article.quantity} x ${article.price}
																</p>
															</div>
															<div>
																<p className='flex justify-center items-center font-medium text-[#491718]'>
																	${article.price}
																</p>
																<p className='flex justify-center items-center font-medium text-[#491718]'>
																	${article.quantity * article.price}
																</p>
															</div>
														</div>
													</div>
												</div>

												{/* <button
													className='flex'
													name={article.name}
													onClick={deleteOrder}
												>
													<FontAwesomeIcon
														className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
														icon={faTrash}
													/>
												</button> */}
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

							{delivery && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{
										duration: 0.3,
										delay: 0,
									}}
									className='flex justify-between font-bold text-[#491718] pt-2'
								>
									<p>Envio:</p>
									<p>${deliveryValue}</p>
								</motion.div>
							)}

							<div className='flex justify-between font-bold text-[#491718] mt-2'>
								<p>Subtotal:</p>
								<p>${order.totalAmount}</p>
							</div>

							<hr className='border-2 border-[#491718] rounded-full my-4' />

							{error.errorOrder && (
								<motion.p
									initial={{ opacity: 0, y: -15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: 0,
									}}
									className='mb-2 text-red-600 font-medium text-sm'
								>
									{error.errorOrder}
								</motion.p>
							)}

							<form onSubmit={handleSubmit} ref={formRef}>
								<input
									className='p-2 w-full rounded-xl bg-black bg-opacity-5 placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
									type='text'
									placeholder='Nombre'
									name='orderName'
									value={message.orderName}
									autoComplete='off'
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
									className='p-2 w-full rounded-xl text-black/60 bg-black bg-opacity-5 mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
									name='orderPayment'
									value={message.orderPayment}
									onChange={handleMessageChange}
								>
									<option className='text-black/60' value='Método de pago'>
										Método de pago
									</option>
									<option className='text-black' value='Efectivo'>
										Efectivo
									</option>
									<option className='text-black' value='Transferencia'>
										Transferencia
									</option>
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
									className='p-2 w-full rounded-xl bg-black text-black/60 bg-opacity-5 mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
									name='orderDispatch'
									value={message.orderDispatch}
									onChange={handleMessageChange}
								>
									<option className='text-black/60' value='Envio/Retiro'>
										Envio / Retiro
									</option>
									<option className='text-black' value='Envio'>
										Quiero que me lo envien
									</option>

									<option className='text-black' value='Retiro'>
										Lo retiro yo mismo
									</option>
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

								{delivery && (
									<motion.input
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0,
										}}
										className='p-2 w-full rounded-xl bg-black bg-opacity-5 placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
										type='text'
										placeholder='Dirección'
										name='orderAddress'
										value={message.orderAddress}
										autoComplete='off'
										onChange={handleMessageChange}
									/>
								)}

								{error.errorAddress && (
									<motion.p
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: 0,
										}}
										className='flex ml-2 mb-2 text-red-600 font-medium text-sm'
									>
										{error.errorAddress}
									</motion.p>
								)}

								<textarea
									className='p-2 w-full rounded-xl bg-black bg-opacity-5 placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
									name='orderNote'
									placeholder='¿ Alguna observación ?'
									value={message.orderNote}
									onChange={handleMessageChange}
								></textarea>

								<div className='flex justify-center font-bold text-2xl my-4'>
									<p>Total:</p>
									<p className='text-[#491718] ml-2'>
										$
										{delivery
											? order.totalAmount + deliveryValue
											: order.totalAmount}
									</p>
								</div>

								<button
									className='bg-[#491718] hover:bg-[#3a1212] active:bg-[#491718] text-[#d2a772] font-semibold p-4 rounded-2xl w-full'
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
